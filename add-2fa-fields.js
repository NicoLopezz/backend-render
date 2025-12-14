import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Usuario from './src/models/Users.js';

dotenv.config();

const add2FAFieldsToUsers = async () => {
  try {
    console.log('🔌 Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database');

    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');
    
    const users = await usersCollection.find({}).toArray();
    console.log(`\n📊 Found ${users.length} users in database`);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const user of users) {
      let needsUpdate = false;
      const updates = {};

      if (!user.hasOwnProperty('isFirstLogin') || user.isFirstLogin === undefined || user.isFirstLogin === null) {
        if ((user.loginCount && user.loginCount > 0) || user.lastLoginAt) {
          updates.isFirstLogin = false;
        } else {
          updates.isFirstLogin = true;
        }
        needsUpdate = true;
      }

      if (!user.hasOwnProperty('twoFactorCode') || user.twoFactorCode === undefined) {
        updates.twoFactorCode = null;
        needsUpdate = true;
      }

      if (!user.hasOwnProperty('twoFactorCodeExpires') || user.twoFactorCodeExpires === undefined) {
        updates.twoFactorCodeExpires = null;
        needsUpdate = true;
      }

      if (needsUpdate) {
        await usersCollection.updateOne(
          { _id: user._id },
          { $set: updates }
        );
        updatedCount++;
        console.log(`✅ Updated user: ${user.email}`);
      } else {
        skippedCount++;
        console.log(`⏭️  Skipped user (already has fields): ${user.email}`);
      }
    }

    console.log(`\n📊 Migration Summary:`);
    console.log(`   Total users: ${users.length}`);
    console.log(`   Updated: ${updatedCount}`);
    console.log(`   Skipped: ${skippedCount}`);
    console.log(`\n✅ Migration completed successfully!`);

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('❌ Stack:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
};

const checkUserFields = async (email) => {
  try {
    console.log('🔌 Connecting to database...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to database');

    if (email) {
      const user = await Usuario.findOne({ email });
      if (!user) {
        console.log(`❌ User not found: ${email}`);
        return;
      }

      console.log(`\n📋 User Details for ${email}:`);
      console.log(`   isFirstLogin: ${user.isFirstLogin !== undefined ? user.isFirstLogin : '❌ MISSING'}`);
      console.log(`   twoFactorCode: ${user.twoFactorCode !== undefined ? (user.twoFactorCode || 'null') : '❌ MISSING'}`);
      console.log(`   twoFactorCodeExpires: ${user.twoFactorCodeExpires !== undefined ? (user.twoFactorCodeExpires || 'null') : '❌ MISSING'}`);
      console.log(`   loginCount: ${user.loginCount || 0}`);
      console.log(`   lastLoginAt: ${user.lastLoginAt || 'null'}`);
    } else {
      const allUsers = await Usuario.find({});
      const usersWithoutFields = allUsers.filter(user => {
        const userDoc = user.toObject ? user.toObject() : user;
        return !userDoc.hasOwnProperty('isFirstLogin') || 
               !userDoc.hasOwnProperty('twoFactorCode') || 
               !userDoc.hasOwnProperty('twoFactorCodeExpires');
      });

      console.log(`\n📊 Users missing 2FA fields: ${usersWithoutFields.length}`);
      if (usersWithoutFields.length > 0) {
        console.log('\n📋 Users missing fields:');
        usersWithoutFields.forEach((user, index) => {
          const missing = [];
          const userDoc = user.toObject ? user.toObject() : user;
          if (!userDoc.hasOwnProperty('isFirstLogin') || userDoc.isFirstLogin === undefined) missing.push('isFirstLogin');
          if (!userDoc.hasOwnProperty('twoFactorCode') || userDoc.twoFactorCode === undefined) missing.push('twoFactorCode');
          if (!userDoc.hasOwnProperty('twoFactorCodeExpires') || userDoc.twoFactorCodeExpires === undefined) missing.push('twoFactorCodeExpires');
          console.log(`   ${index + 1}. ${user.email} - Missing: ${missing.join(', ')}`);
        });
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from database');
  }
};

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'migrate':
    await add2FAFieldsToUsers();
    break;

  case 'check':
    const email = args[1];
    await checkUserFields(email);
    break;

  default:
    console.log('📋 Available commands:');
    console.log('   node add-2fa-fields.js migrate  - Add 2FA fields to all users');
    console.log('   node add-2fa-fields.js check  - Check which users are missing fields');
    console.log('   node add-2fa-fields.js check <email>  - Check specific user');
    console.log('   Examples:');
    console.log('     node add-2fa-fields.js migrate');
    console.log('     node add-2fa-fields.js check');
    console.log('     node add-2fa-fields.js check user@example.com');
    break;
}

