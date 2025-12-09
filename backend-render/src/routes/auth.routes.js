import { Router } from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import {methods as autenthication} from "../controllers/auth.controller.js"


const router = Router()
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/register" , autenthication.register) 
router.post("/login" , autenthication.login)
router.post("/verify-affiliate-code" , autenthication.verifyAffiliateCode) 
router.post("/verify-email" , autenthication.verifyEmailPost) 
router.post("/update-welcome-modal" , autenthication.updateWelcomeModal) 
router.post("/update-onboarding-step" , autenthication.updateOnboardingStep) 
router.post("/update-profile-status" , autenthication.updateProfileStatus) 
router.post("/logout" , autenthication.logout)
router.post("/2fa/generate" , autenthication.generate2FA)
router.post("/2fa/verify" , autenthication.verify2FA)
router.post("/2fa/status" , autenthication.status2FA)
router.post("/reset-affiliate-code" , autenthication.resetAffiliateCode)

router.get("/post-register", (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/post-register.html"));
});

router.get("/verify-success", (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/verify-success.html"));
});

router.get("/verify-error", (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/verify-error.html"));
});

router.get("/verify-expired", (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/verify-expired.html"));
});

router.get("/verify/:token" , autenthication.verifyCount)

router.get("/verify" , autenthication.verifyWithQuery)

router.get("/allUsers" , autenthication.allUsers)

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/index.html"));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname,"../../public/login.html"));
});

router.get("/dashboard" , autenthication.verifyToken ,autenthication.dashboard  )
router.get("/session" , autenthication.checkSession)

export default router;







