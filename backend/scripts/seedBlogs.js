const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');
require('dotenv').config();

const blogsData = [
  {
    title: 'Top 10 Bridal Makeup Trends for 2025',
    slug: 'bridal-makeup-trends-2025',
    excerpt: 'Discover the hottest bridal makeup trends that will make you look stunning on your wedding day. From natural glam to bold statements.',
    content: `
      <h2>Introduction</h2>
      <p>Your wedding day is one of the most important days of your life, and your makeup should be perfect! Here are the top bridal makeup trends for 2025 that every bride should know about.</p>
      
      <h2>1. Natural Glam Look</h2>
      <p>The natural glam look continues to dominate in 2025. This style focuses on enhancing your natural beauty with subtle contouring, soft eyeshadows, and nude lips. It's perfect for brides who want to look like themselves, just more polished.</p>
      
      <h2>2. Bold Lips Are Back</h2>
      <p>Red and berry-toned lips are making a comeback! If you're confident and want to make a statement, a bold lip color paired with minimal eye makeup creates a stunning, classic look.</p>
      
      <h2>3. Dewy Skin</h2>
      <p>Matte is out, dewy is in! Glowing, hydrated skin is the foundation of modern bridal makeup. Use highlighters strategically on cheekbones, nose bridge, and cupid's bow for that radiant glow.</p>
      
      <h2>4. Soft Smokey Eyes</h2>
      <p>Instead of heavy black smokey eyes, brides are opting for softer versions using browns, taupes, and champagne shades. This creates depth without being too dramatic.</p>
      
      <h2>5. Feathered Brows</h2>
      <p>Natural, feathered brows are replacing the heavily filled-in look. The goal is to enhance your natural brow shape while keeping them soft and natural-looking.</p>
      
      <h2>Conclusion</h2>
      <p>Remember, the best bridal makeup is one that makes you feel confident and beautiful. Book a trial session to find the perfect look for your special day!</p>
    `,
    tags: ['bridal', 'makeup trends', 'wedding', '2025', 'beauty tips'],
    category: 'Bridal Makeup',
    published: true
  },
  {
    title: 'How to Prepare Your Skin Before Makeup',
    slug: 'skin-preparation-before-makeup',
    excerpt: 'Learn the essential steps to prep your skin for flawless makeup application. A good skincare routine is the secret to long-lasting makeup.',
    content: `
      <h2>Why Skin Preparation Matters</h2>
      <p>Great makeup starts with great skin! Proper skin preparation ensures your makeup applies smoothly, looks natural, and lasts longer. Here's your complete guide.</p>
      
      <h2>Step 1: Cleanse</h2>
      <p>Start with a gentle cleanser to remove dirt, oil, and impurities. Use lukewarm water and pat your face dry with a clean towel. Never apply makeup on dirty skin!</p>
      
      <h2>Step 2: Exfoliate (1-2 times a week)</h2>
      <p>Exfoliation removes dead skin cells and creates a smooth canvas for makeup. Don't over-exfoliate as it can irritate your skin. Once or twice a week is perfect.</p>
      
      <h2>Step 3: Tone</h2>
      <p>A good toner balances your skin's pH and tightens pores. Apply with a cotton pad or spray directly on your face. Wait for it to absorb before moving to the next step.</p>
      
      <h2>Step 4: Moisturize</h2>
      <p>This is the most important step! Choose a moisturizer suitable for your skin type. Let it absorb for 5-10 minutes before applying primer or foundation.</p>
      
      <h2>Step 5: Prime</h2>
      <p>Primer creates a smooth base and helps makeup last longer. Use a pore-filling primer for oily skin or a hydrating primer for dry skin.</p>
      
      <h2>Pro Tips</h2>
      <ul>
        <li>Drink plenty of water for hydrated skin</li>
        <li>Get enough sleep before your event</li>
        <li>Avoid trying new products right before an important event</li>
        <li>Use SPF even if you're indoors</li>
      </ul>
    `,
    tags: ['skincare', 'makeup tips', 'beauty routine', 'skin prep'],
    category: 'Beauty Tips',
    published: true
  },
  {
    title: 'HD vs Airbrush vs Matte Makeup: Which is Right for You?',
    slug: 'hd-airbrush-matte-makeup-comparison',
    excerpt: 'Confused about makeup finishes? Learn the differences between HD, Airbrush, and Matte makeup to choose the perfect one for your event.',
    content: `
      <h2>Understanding Different Makeup Finishes</h2>
      <p>Choosing the right makeup finish can make or break your look. Let's break down the three most popular types and help you decide which is best for you.</p>
      
      <h2>HD Makeup</h2>
      <p><strong>What it is:</strong> HD (High Definition) makeup is specially formulated to look flawless on camera and in person. It uses finely milled pigments that don't reflect light.</p>
      <p><strong>Best for:</strong> Weddings, photoshoots, events with professional photography</p>
      <p><strong>Pros:</strong> Camera-friendly, natural finish, long-lasting, covers imperfections well</p>
      <p><strong>Cons:</strong> Can be expensive, requires skilled application</p>
      
      <h2>Airbrush Makeup</h2>
      <p><strong>What it is:</strong> Makeup applied using an airbrush gun that sprays a fine mist of foundation. Creates an even, flawless finish.</p>
      <p><strong>Best for:</strong> Brides, models, anyone wanting a perfect, long-lasting finish</p>
      <p><strong>Pros:</strong> Extremely long-lasting (12+ hours), waterproof, lightweight, flawless coverage</p>
      <p><strong>Cons:</strong> More expensive, requires professional application, can look too perfect/artificial if not done right</p>
      
      <h2>Matte Makeup</h2>
      <p><strong>What it is:</strong> Traditional makeup with a non-shiny, velvety finish. No shimmer or glow.</p>
      <p><strong>Best for:</strong> Oily skin, formal events, those who prefer a classic look</p>
      <p><strong>Pros:</strong> Controls oil, photographs well, sophisticated look, affordable</p>
      <p><strong>Cons:</strong> Can look flat, may emphasize dry patches, less trendy</p>
      
      <h2>Which Should You Choose?</h2>
      <ul>
        <li><strong>For Weddings:</strong> HD or Airbrush</li>
        <li><strong>For Photoshoots:</strong> HD Makeup</li>
        <li><strong>For Oily Skin:</strong> Matte or Airbrush</li>
        <li><strong>For Dry Skin:</strong> HD with dewy finish</li>
        <li><strong>For Long Events:</strong> Airbrush</li>
      </ul>
      
      <p>Still confused? Book a consultation and we'll help you choose the perfect finish for your event!</p>
    `,
    tags: ['makeup types', 'HD makeup', 'airbrush', 'matte makeup', 'beauty guide'],
    category: 'Makeup Education',
    published: true
  },
  {
    title: '5 Makeup Mistakes to Avoid on Your Wedding Day',
    slug: 'wedding-makeup-mistakes-to-avoid',
    excerpt: 'Don\'t let these common makeup mistakes ruin your bridal look! Learn what to avoid for picture-perfect wedding makeup.',
    content: `
      <h2>Common Bridal Makeup Mistakes</h2>
      <p>Your wedding day makeup should be flawless! Here are the top mistakes brides make and how to avoid them.</p>
      
      <h2>1. Trying New Products on Wedding Day</h2>
      <p>Never experiment with new makeup products or skincare on your wedding day! Always do a trial run at least 2-3 weeks before. This gives you time to test for allergies and see how products photograph.</p>
      
      <h2>2. Wrong Foundation Shade</h2>
      <p>The most common mistake! Your foundation should match your neck, not your face. Test shades in natural light and always blend down to your neck. Avoid foundations with SPF as they can cause flashback in photos.</p>
      
      <h2>3. Over-Contouring</h2>
      <p>Heavy contouring looks great on Instagram but can appear harsh in person and photos. Keep it subtle and blend, blend, blend! Your wedding photos should look like you, not someone else.</p>
      
      <h2>4. Ignoring Your Skin Type</h2>
      <p>If you have oily skin, use mattifying products. If you have dry skin, use hydrating formulas. Don't follow trends that don't suit your skin type. Your makeup artist should customize products for your skin.</p>
      
      <h2>5. Skipping the Trial</h2>
      <p>A makeup trial is essential! It's your chance to test the look, make changes, and ensure you're comfortable. Never skip this step, even if you trust your makeup artist completely.</p>
      
      <h2>Bonus Tips</h2>
      <ul>
        <li>Start skincare routine 3 months before wedding</li>
        <li>Stay hydrated</li>
        <li>Get enough sleep</li>
        <li>Bring touch-up products for the day</li>
        <li>Trust your makeup artist's expertise</li>
      </ul>
    `,
    tags: ['bridal makeup', 'wedding tips', 'makeup mistakes', 'beauty advice'],
    category: 'Bridal Makeup',
    published: true
  },
  {
    title: 'The Ultimate Guide to Hair Care After Keratin Treatment',
    slug: 'hair-care-after-keratin-treatment',
    excerpt: 'Make your keratin treatment last longer with these essential aftercare tips. Learn how to maintain smooth, frizz-free hair.',
    content: `
      <h2>Caring for Your Hair After Keratin Treatment</h2>
      <p>You've invested in a keratin treatment - now let's make it last! Follow these tips to maintain smooth, beautiful hair for months.</p>
      
      <h2>First 72 Hours Are Crucial</h2>
      <p>The first 3 days after treatment are the most important:</p>
      <ul>
        <li>Don't wash your hair</li>
        <li>Avoid tying your hair</li>
        <li>Don't use clips or hair bands</li>
        <li>Keep hair straight and down</li>
        <li>Avoid getting hair wet (rain, sweat, swimming)</li>
      </ul>
      
      <h2>Choosing the Right Products</h2>
      <p>Use sulfate-free shampoos and conditioners only! Sulfates strip away the keratin treatment. Look for products specifically designed for keratin-treated hair.</p>
      
      <h2>Washing Your Hair</h2>
      <p>After the first 72 hours:</p>
      <ul>
        <li>Wash hair 2-3 times a week maximum</li>
        <li>Use lukewarm or cool water</li>
        <li>Apply conditioner from mid-length to ends</li>
        <li>Gently pat dry with a microfiber towel</li>
      </ul>
      
      <h2>Styling Tips</h2>
      <ul>
        <li>Use heat protectant before styling</li>
        <li>Keep flat iron temperature below 350°F</li>
        <li>Avoid excessive heat styling</li>
        <li>Let hair air dry when possible</li>
      </ul>
      
      <h2>What to Avoid</h2>
      <ul>
        <li>Chlorine (swimming pools)</li>
        <li>Salt water</li>
        <li>Hair colors for at least 2 weeks</li>
        <li>Harsh chemical treatments</li>
      </ul>
      
      <p>Follow these tips and your keratin treatment can last 3-6 months! Book your next appointment before the treatment completely wears off.</p>
    `,
    tags: ['hair care', 'keratin treatment', 'hair tips', 'aftercare'],
    category: 'Hair Care',
    published: true
  }
];

const seedBlogs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get admin user
    const admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      console.log('⚠️  No admin user found. Creating blogs without author.');
    }

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('🗑️  Cleared existing blogs');

    // Add author to blogs if admin exists
    const blogsWithAuthor = blogsData.map(blog => ({
      ...blog,
      author: admin ? admin._id : null
    }));

    // Insert new blogs
    await Blog.insertMany(blogsWithAuthor);
    console.log('✅ Added 5 blog posts');

    console.log('\n📝 Blog Posts Created:');
    blogsData.forEach((blog, index) => {
      console.log(`   ${index + 1}. ${blog.title}`);
    });

    console.log('\n🎉 Blogs seeded successfully!');
    console.log('🌐 Visit http://localhost:3000/blog to read all posts');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding blogs:', error);
    process.exit(1);
  }
};

seedBlogs();
