import { Router } from 'express';
import { methods as walletMethods } from '../controllers/wallet.controller.js';

const router = Router();

router.get('/wallet/check', walletMethods.checkWallet);
router.post('/wallet/link', walletMethods.linkWallet);
router.get('/wallet/nonce', walletMethods.getNonce);
router.get('/wallet/should-show-siwe', walletMethods.shouldShowSIWE);
router.post('/wallet/should-show-siwe', walletMethods.shouldShowSIWE);

export default router;

