import PreUsersCalc from "../models/PreUsersCalc.js"

async function createPreUser(req, res) {
    try {
        const { name, email, calculatorData, finalResult } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            })
        }

        let preUser = await PreUsersCalc.findOne({ email })
        const isNew = !preUser

        if (!preUser) {
            preUser = new PreUsersCalc({
                name,
                email,
                calculatorData: calculatorData ?? null,
                finalResult: finalResult ?? null,
            })
        } else {
            if (name !== undefined) {
                preUser.name = name
            }
            if (calculatorData !== undefined) {
                preUser.calculatorData = calculatorData
            }
            if (finalResult !== undefined) {
                preUser.finalResult = finalResult
            }
        }

        if (preUser.finalResult !== null && preUser.status !== "completed") {
            preUser.status = "completed"
            preUser.completedAt = new Date()
        }

        if (preUser.finalResult === null && preUser.status === "completed") {
            preUser.status = "pending"
            preUser.completedAt = null
        }

        await preUser.save()

        return res.status(isNew ? 201 : 200).json({
            success: true,
            data: {
                id: preUser._id,
                email: preUser.email,
                status: preUser.status,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

async function updatePreUserResult(req, res) {
    try {
        const { id } = req.params
        const { name, email, calculatorData, finalResult } = req.body

        const query = id ? { _id: id } : email ? { email } : null

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Id or email is required",
            })
        }

        const preUser = await PreUsersCalc.findOne(query)

        if (!preUser) {
            return res.status(404).json({
                success: false,
                message: "Pre user not found",
            })
        }

        if (name !== undefined) {
            preUser.name = name
        }

        if (email !== undefined) {
            preUser.email = email
        }

        if (calculatorData !== undefined) {
            preUser.calculatorData = calculatorData
        }

        if (finalResult !== undefined) {
            preUser.finalResult = finalResult
        }

        if (preUser.finalResult !== null && preUser.status !== "completed") {
            preUser.status = "completed"
            preUser.completedAt = new Date()
        }

        if (preUser.finalResult === null && preUser.status === "completed") {
            preUser.status = "pending"
            preUser.completedAt = null
        }

        await preUser.save()

        return res.status(200).json({
            success: true,
            data: {
                id: preUser._id,
                email: preUser.email,
                status: preUser.status,
            },
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

export const methods = {
    createPreUser,
    updatePreUserResult,
}


