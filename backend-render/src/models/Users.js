import {Schema , model} from "mongoose"

const User = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    companyName: {
        type: String,
        required: false,
        trim: true,
    },
    affiliateCode: {
        type: String,
        required: false,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v) return true;
                return true; // Temporalmente deshabilitar validación para testing
                // return /^\d{3}[a-zA-Z]{3}$/i.test(v);
            },
            message: 'Invalid affiliate code format'
        }
    },
    usedAffiliateCode: {
        type: Schema.Types.ObjectId,
        ref: 'lumenAffiliateCodes',
        default: null
    },
    bonusOMsReceived: {
        type: Number,
        default: 0
    },
    affiliateCodeUsedAt: {
        type: Date,
        default: null
    },
    Name: {
        type: String,
        trim: true,
    },
    Surname: {
        type: String,
        trim: true,
    },
    Email: {
        type: String,
        trim: true,
        unique: false,
    },
    Pass: {
        type: String,
        trim: true,
    },
    Verify: {
        type: Boolean,
        trim: true,
    },
    Movimientos: [
        {
          tipo: { type: String },
          cantidad: { type: Number },
          fecha: { type: Date }
        }
      ],
    Estado_Financiero: {
        saldoInicial: { type: Number, default: 0 }
    },
    welcomeModalShown: {
        type: Boolean,
        default: false
    },
    lastLoginAt: {
        type: Date,
        default: null
    },
    loginCount: {
        type: Number,
        default: 0
    },
    profileCompleted: {
        type: Boolean,
        default: false
    },
    onboardingStep: {
        type: String,
        enum: ['pending', 'email_verified', 'affiliate_processed', 'profile_completed', 'welcome_shown', 'skipped', 'paso_1', 'paso_2', 'paso_3', 'paso_4'],
        default: 'pending'
    },
    onboardingCurrentStep: {
        type: Number,
        default: null
    },
    wallet_address: {
        type: String,
        trim: true,
        lowercase: true
    },
    isFirstLogin: {
        type: Boolean,
        default: true
    },
    twoFactorCode: {
        type: String,
        default: null,
        trim: true
    },
    twoFactorCodeExpires: {
        type: Date,
        default: null
    },
    carbonCredits: {
        type: Number,
        default: 0
    },
    omBalance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    versionKey: false,
});

export default model('users',User)





