import { Router } from "express"
import { methods as preUsers } from "../controllers/preUsers.controller.js"

const router = Router()

router.post("/pre-users-calc", preUsers.createPreUser)
router.put("/pre-users-calc/:id?", preUsers.updatePreUserResult)

export default router


