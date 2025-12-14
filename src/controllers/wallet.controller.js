import Usuario from '../models/Users.js';
import { SiweMessage } from 'siwe';
import jsonwebtoken from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const nonces = new Map();

const generateNonce = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
};

const checkWallet = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ 
                isLinked: false, 
                walletAddress: null,
                error: 'No token provided'
            });
        }

        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    isLinked: false, 
                    walletAddress: null,
                    error: 'Token expired'
                });
            } else if (jwtError.name === 'JsonWebTokenError') {
                return res.status(401).json({ 
                    isLinked: false, 
                    walletAddress: null,
                    error: 'Invalid token'
                });
            }
            throw jwtError;
        }

        const usuario = await Usuario.findOne({ email: decoded.userMail });

        if (!usuario) {
            return res.status(404).json({ 
                isLinked: false, 
                walletAddress: null,
                error: 'User not found'
            });
        }

        return res.json({
            isLinked: !!usuario.wallet_address,
            walletAddress: usuario.wallet_address || null
        });

    } catch (error) {
        console.error('Error checking wallet:', error);
        return res.status(500).json({ 
            isLinked: false, 
            walletAddress: null,
            error: 'Internal server error'
        });
    }
};

const linkWallet = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No autenticado' 
            });
        }

        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Token expirado. Por favor, inicia sesión nuevamente.' 
                });
            } else if (jwtError.name === 'JsonWebTokenError') {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Token inválido' 
                });
            }
            throw jwtError;
        }

        const { message, signature } = req.body;

        if (!message || !signature) {
            return res.status(400).json({ 
                success: false, 
                message: 'Mensaje y firma son requeridos' 
            });
        }

        const usuario = await Usuario.findOne({ email: decoded.userMail });

        if (!usuario) {
            return res.status(404).json({ 
                success: false, 
                message: 'Usuario no encontrado' 
            });
        }

        if (usuario.wallet_address) {
            return res.status(400).json({ 
                success: false, 
                message: 'Ya tienes una wallet vinculada' 
            });
        }

        console.log("🔍 Verificando firma SIWE...");
        console.log("   📧 Usuario:", usuario.email);
        console.log("   🔑 Wallet en mensaje:", message.address);
        
        const siweMessage = new SiweMessage(message);
        const response = await siweMessage.verify({ signature });

        if (!response.success) {
            console.error("❌ Verificación SIWE fallida:", response.error?.type || 'Firma SIWE inválida');
            return res.status(400).json({ 
                success: false, 
                message: response.error?.type || 'Firma SIWE inválida' 
            });
        }

        console.log("✅ Firma SIWE verificada correctamente");
        const fields = response.data;

        if (fields.nonce && nonces.has(fields.nonce)) {
            console.log("✅ Nonce válido encontrado");
            nonces.delete(fields.nonce);
        } else {
            console.error("❌ Nonce inválido o expirado");
            return res.status(400).json({ 
                success: false, 
                message: 'Nonce inválido o expirado' 
            });
        }

        const existingWallet = await Usuario.findOne({ 
            wallet_address: fields.address.toLowerCase() 
        });

        if (existingWallet && existingWallet.email !== usuario.email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Esta wallet ya está vinculada a otro usuario' 
            });
        }

        usuario.wallet_address = fields.address.toLowerCase();
        await usuario.save();

        console.log("✅ Wallet vinculada exitosamente:");
        console.log("   📧 Usuario:", usuario.email);
        console.log("   🔑 Wallet:", fields.address.toLowerCase());
        console.log("   🌐 Dominio:", fields.domain);
        console.log("   📅 Fecha vinculación:", new Date().toISOString());

        return res.json({
            success: true,
            walletAddress: usuario.wallet_address
        });

    } catch (error) {
        console.error('Error linking wallet:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error al vincular wallet' 
        });
    }
};

const getNonce = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No autenticado' 
            });
        }

        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Token expirado. Por favor, inicia sesión nuevamente.' 
                });
            } else if (jwtError.name === 'JsonWebTokenError') {
                return res.status(401).json({ 
                    success: false, 
                    message: 'Token inválido' 
                });
            }
            throw jwtError;
        }

        const nonce = generateNonce();
        
        nonces.set(nonce, {
            email: decoded.userMail,
            createdAt: Date.now()
        });

        setTimeout(() => {
            nonces.delete(nonce);
        }, 5 * 60 * 1000);

        return res.json({ nonce });

    } catch (error) {
        console.error('Error generating nonce:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error al generar nonce' 
        });
    }
};

const shouldShowSIWE = async (req, res) => {
    try {
        const walletAddress = req.body.walletAddress || req.query.address;
        
        if (!walletAddress) {
            return res.status(400).json({ 
                success: false,
                shouldShowModal: false,
                message: 'Wallet address is required' 
            });
        }

        const normalizedAddress = walletAddress.toLowerCase();
        const usuario = await Usuario.findOne({ wallet_address: normalizedAddress });

        const shouldShowModal = !usuario || !usuario.wallet_address;

        return res.json({
            success: true,
            shouldShowModal: shouldShowModal,
            isLinked: !!usuario?.wallet_address,
            walletAddress: usuario?.wallet_address || null
        });

    } catch (error) {
        console.error('Error checking should show SIWE:', error);
        return res.status(500).json({ 
            success: false,
            shouldShowModal: false,
            message: 'Internal server error' 
        });
    }
};

export const methods = {
    checkWallet,
    linkWallet,
    getNonce,
    shouldShowSIWE
};

