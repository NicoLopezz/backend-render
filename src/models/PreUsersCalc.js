import { Schema, model } from "mongoose"

const PreUsersCalc = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    calculatorData: {
        type: Schema.Types.Mixed,
        default: null,
    },
    finalResult: {
        type: Schema.Types.Mixed,
        default: null,
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
    },
    completedAt: {
        type: Date,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
})

export default model("preUsersCalc", PreUsersCalc)


