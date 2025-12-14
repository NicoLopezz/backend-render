import { Schema, model } from "mongoose";

const AffiliateCode = new Schema({
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
    },
    messageType: {
        type: String,
        enum: ['welcome', 'prize_1st', 'prize_2nd', 'prize_3rd', 'special', 'partner', 'default'],
        default: 'default'
    }
}, {
    timestamps: true,
    versionKey: false
});

AffiliateCode.index({ code: 1 });
AffiliateCode.index({ isUsed: 1 });
AffiliateCode.index({ usedBy: 1 });
AffiliateCode.index({ isActive: 1 });

AffiliateCode.statics.findByCode = async function(code) {
    return await this.findOne({ code });
};

export default model('affiliateCodes', AffiliateCode);


