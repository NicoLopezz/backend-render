import mongoose from 'mongoose';
import AffiliateCode from './src/models/AffiliateCodes.js';
import config from './src/config.js';

const generateAffiliateCode = () => {
    const numbers = Math.floor(Math.random() * 900) + 100;
    const letters = Array.from({ length: 3 }, () => 
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
    return `${numbers}${letters}`;
};

const generateUniqueCodes = (count) => {
    const codes = new Set();
    while (codes.size < count) {
        codes.add(generateAffiliateCode());
    }
    return Array.from(codes);
};

const createAffiliateCodes = async () => {
    try {
        await mongoose.connect(config.mongodbURL);
        console.log('Conectado a MongoDB');

        const existingCodes = await AffiliateCode.find({}, 'code');
        const existingCodeSet = new Set(existingCodes.map(item => item.code));
        
        console.log(`Códigos existentes: ${existingCodeSet.size}`);

        const newCodes = [];
        let attempts = 0;
        const maxAttempts = 1000;

        while (newCodes.length < 200 && attempts < maxAttempts) {
            const code = generateAffiliateCode();
            if (!existingCodeSet.has(code) && !newCodes.includes(code)) {
                newCodes.push(code);
            }
            attempts++;
        }

        if (newCodes.length < 200) {
            console.log(`Solo se pudieron generar ${newCodes.length} códigos únicos`);
        }

        const affiliateCodes = newCodes.map(code => ({
            code,
            isUsed: false,
            bonusOMs: 5,
            isActive: true,
            createdAt: new Date()
        }));

        const result = await AffiliateCode.insertMany(affiliateCodes);
        console.log(`✅ Se crearon ${result.length} códigos de afiliados nuevos`);
        
        console.log('Primeros 10 códigos generados:');
        result.slice(0, 10).forEach((item, index) => {
            console.log(`${index + 1}. ${item.code}`);
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Desconectado de MongoDB');
    }
};

createAffiliateCodes();
