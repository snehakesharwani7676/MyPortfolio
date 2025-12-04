const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const portfolioSchema = new mongoose.Schema({
  title: String,
  category: String,
  images: [{ url: String, caption: String }],
  afterImage: String,
  clientName: String,
  eventDate: Date,
  description: String,
  tags: [String],
  featured: Boolean
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

async function removeClientInfo() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Remove client names and event dates from all portfolio items
    const result = await Portfolio.updateMany(
      {},
      {
        $unset: {
          clientName: '',
          eventDate: ''
        }
      }
    );

    console.log(`✅ Removed client info from ${result.modifiedCount} items`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

removeClientInfo();
