import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

async function fixWalletIndex() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const usersCollection = db.collection('users');

    // Check existing indexes
    console.log('Current indexes:');
    const indexes = await usersCollection.indexes();
    console.log(indexes);

    // Drop the problematic index if it exists
    try {
      await usersCollection.dropIndex('wallet_address_1');
      console.log('Dropped wallet_address_1 index');
    } catch (err) {
      console.log('Index wallet_address_1 does not exist or already dropped');
    }

    // Create new sparse index
    await usersCollection.createIndex(
      { wallet_address: 1 },
      { unique: true, sparse: true }
    );
    console.log('Created new sparse unique index on wallet_address');

    // Verify new indexes
    console.log('New indexes:');
    const newIndexes = await usersCollection.indexes();
    console.log(newIndexes);

    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixWalletIndex();
