const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const { protect, adminOnly } = require('../middleware/auth');

// Get all portfolio items (public)
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (featured) query.featured = true;

    const portfolioItems = await Portfolio.find(query).sort({ createdAt: -1 });
    res.json(portfolioItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single portfolio item
router.get('/:id', async (req, res) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create portfolio item (admin only)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const portfolioItem = await Portfolio.create(req.body);
    res.status(201).json(portfolioItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update portfolio item (admin only)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete portfolio item (admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get categories
router.get('/stats/categories', async (req, res) => {
  try {
    const categories = await Portfolio.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
