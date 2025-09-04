import mongoose from 'mongoose';
import dotenv from 'dotenv';
import LumenAffiliateCode from './src/models/LumenAffiliateCodes.js';

dotenv.config();

const cleanAllAffiliateCodes = async () => {
    try {
        console.log('🔗 Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to database');

        console.log('🧹 Starting affiliate codes cleanup...');
        
        const result = await LumenAffiliateCode.updateMany(
            {},
            {
                $set: {
                    isUsed: false,
                    usedBy: null,
                    usedAt: null,
                    usedEmail: null,
                    isActive: true,
                    'usageDetails.ipAddress': null,
                    'usageDetails.userAgent': null,
                    'usageDetails.country': null
                }
            }
        );

        console.log(`✅ Cleanup completed successfully!`);
        console.log(`📊 Affected documents: ${result.modifiedCount}`);
        
        const totalCodes = await LumenAffiliateCode.countDocuments();
        const activeCodes = await LumenAffiliateCode.countDocuments({ isActive: true });
        const availableCodes = await LumenAffiliateCode.countDocuments({ isUsed: false });
        
        console.log(`📈 Final statistics:`);
        console.log(`   Total codes: ${totalCodes}`);
        console.log(`   Active codes: ${activeCodes}`);
        console.log(`   Available codes: ${availableCodes}`);
        
    } catch (error) {
        console.error('❌ Error during cleanup:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from database');
    }
};

const showCurrentStatus = async () => {
    try {
        console.log('🔗 Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to database');

        const totalCodes = await LumenAffiliateCode.countDocuments();
        const usedCodes = await LumenAffiliateCode.countDocuments({ isUsed: true });
        const activeCodes = await LumenAffiliateCode.countDocuments({ isActive: true });
        const availableCodes = await LumenAffiliateCode.countDocuments({ isUsed: false });
        
        console.log(`📊 Current affiliate codes status:`);
        console.log(`   Total codes: ${totalCodes}`);
        console.log(`   Used codes: ${usedCodes}`);
        console.log(`   Active codes: ${activeCodes}`);
        console.log(`   Available codes: ${availableCodes}`);
        
    } catch (error) {
        console.error('❌ Error getting status:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from database');
    }
};

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'clean':
        await cleanAllAffiliateCodes();
        break;
        
    case 'status':
        await showCurrentStatus();
        break;
        
    default:
        console.log('📋 Available commands:');
        console.log('   node clean-affiliate-codes.js clean   - Clean and enable all affiliate codes');
        console.log('   node clean-affiliate-codes.js status  - Show current status');
        console.log('   Examples:');
        console.log('     node clean-affiliate-codes.js clean');
        console.log('     node clean-affiliate-codes.js status');
        break;
}
