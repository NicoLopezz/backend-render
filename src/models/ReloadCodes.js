import { Schema, model } from "mongoose";

const ReloadCode = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true
    },
    omAmount: {
        type: Number,
        required: true,
        min: 1
    },
    isUsed: {
        type: Boolean,
        default: false
    },
    usedBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        default: null
    },
    usedAt: {
        type: Date,
        default: null
    },
    usedEmail: {
        type: String,
        default: null,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    expiresAt: {
        type: Date,
        default: null
    },
    type: {
        type: String,
        enum: ['promo', 'gift', 'purchase', 'reward', 'partner', 'test'],
        default: 'promo'
    },
    description: {
        type: String,
        default: null,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

ReloadCode.index({ code: 1 });
ReloadCode.index({ isUsed: 1 });
ReloadCode.index({ isActive: 1 });
ReloadCode.index({ usedBy: 1 });

ReloadCode.statics.findByCode = async function(code) {
    return await this.findOne({ code: code.toUpperCase().trim() });
};

export default model('reloadCodes', ReloadCode);
