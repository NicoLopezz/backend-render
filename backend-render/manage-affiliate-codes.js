import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LumenAffiliateCode from './src/models/LumenAffiliateCodes.js';

dotenv.config();

const checkAffiliateCode = async (code) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const affiliateCode = await LumenAffiliateCode.findOne({ code });
        
        if (!affiliateCode) {
            console.log(`❌ Code ${code} not found`);
            return;
        }
        
        console.log(`\n📋 Affiliate Code Details:`);
        console.log(`   Code: ${affiliateCode.code}`);
        console.log(`   Is Used: ${affiliateCode.isUsed}`);
        console.log(`   Is Active: ${affiliateCode.isActive}`);
        console.log(`   Bonus OMs: ${affiliateCode.bonusOMs}`);
        console.log(`   Created: ${affiliateCode.createdAt}`);
        console.log(`   Hashed: ${affiliateCode.hashedCode ? 'Yes' : 'No'}`);
        
        if (affiliateCode.isUsed) {
            console.log(`   Used By: ${affiliateCode.usedBy}`);
            console.log(`   Used At: ${affiliateCode.usedAt}`);
            console.log(`   Used Email: ${affiliateCode.usedEmail}`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
};

const listAffiliateCodes = async (limit = 20, showUsed = false) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        const filter = showUsed ? {} : { isUsed: false };
        const codes = await LumenAffiliateCode.find(filter).limit(limit);
        
        console.log(`\n📋 Affiliate Codes (${showUsed ? 'All' : 'Available'}):`);
        codes.forEach((code, index) => {
            const status = code.isUsed ? '❌ Used' : '✅ Available';
            console.log(`   ${index + 1}. ${code.code} - ${status}`);
        });
        
        const totalCount = await LumenAffiliateCode.countDocuments();
        const usedCount = await LumenAffiliateCode.countDocuments({ isUsed: true });
        const availableCount = totalCount - usedCount;
        
        console.log(`\n📊 Statistics:`);
        console.log(`   Total codes: ${totalCount}`);
        console.log(`   Used codes: ${usedCount}`);
        console.log(`   Available codes: ${availableCount}`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
};

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'check':
        const codeToCheck = args[1];
        if (!codeToCheck) {
            console.log('❌ Please provide a code to check: node manage-affiliate-codes.js check <code>');
            break;
        }
        await checkAffiliateCode(codeToCheck);
        break;
        
    case 'list':
        const limit = parseInt(args[1]) || 20;
        const showUsed = args[2] === 'all';
        await listAffiliateCodes(limit, showUsed);
        break;
        
    default:
        console.log('📋 Available commands:');
        console.log('   node manage-affiliate-codes.js check <code>  - Check specific code');
        console.log('   node manage-affiliate-codes.js list [limit] [all]  - List codes');
        console.log('   Examples:');
        console.log('     node manage-affiliate-codes.js check 785609');
        console.log('     node manage-affiliate-codes.js list 10');
        console.log('     node manage-affiliate-codes.js list 20 all');
        break;
}
