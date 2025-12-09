import { Schema, model } from "mongoose";

const LumenAffiliateCode = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{3}[a-zA-Z]{3}$/.test(v);
            },
            message: 'Invalid affiliate code format'
        }
    },
    isUsed: {
        type: Boolean,
        default: false,
        required: true
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
    bonusOMs: {
        type: Number,
        default: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
    usageDetails: {
        ipAddress: {
            type: String,
            default: null
        },
        userAgent: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        }
    },
    notes: {
        type: String,
        default: null,
        trim: true
    }
}, {
    timestamps: true,
    versionKey: false
});

LumenAffiliateCode.index({ code: 1 });
LumenAffiliateCode.index({ isUsed: 1 });
LumenAffiliateCode.index({ usedBy: 1 });
LumenAffiliateCode.index({ isActive: 1 });

LumenAffiliateCode.statics.findByCode = async function(code) {
    return await this.findOne({ code });
};

export default model('lumenAffiliateCodes', LumenAffiliateCode);
