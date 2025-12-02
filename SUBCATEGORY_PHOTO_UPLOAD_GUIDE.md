# 📸 Subcategory Photo Upload Path Guide

This guide explains the photo upload path structure for all portfolio subcategories based on the application code.

---

## 🗂️ Directory Structure Overview

All portfolio images are stored in the `frontend/public/images/portfolio/` directory with subcategory-specific folders.

```
frontend/public/images/portfolio/
├── bridal/          # Bridal Makeup photos
├── engagement/      # Engagement Makeup photos
├── reception/       # Reception Makeup photos
├── glam/            # Glam Makeup photos
├── self-makeup/     # Self Makeup photos
├── teen-makeup/     # Teen Makeup photos
├── fantasy/         # Fantasy Makeup photos
├── bronze/          # Bronze Makeup photos
├── model-bride/     # Model Bride photos
├── hair-do/         # Hair-do Gallery photos
├── keratin/         # Keratin Treatment photos
├── rebonding/       # Rebonding photos
├── botox/           # Botox Treatment photos
├── smoothening/     # Smoothening photos
├── hairstyles/      # Hairstyles photos
├── nail-art/        # Nail Art photos
├── nail-extension/  # Nail Extension photos
├── facials/         # Facials photos
├── manicure-pedicure/ # Manicure-Pedicure photos
└── waxing/          # Waxing photos
```

---

## 📋 Category-wise Upload Paths

### 💄 MAKEUP PORTFOLIO

#### 1. Bridal Makeup
- **Category Name:** `Bridal`
- **Upload Path:** `/images/portfolio/bridal/`
- **Example:** `/images/portfolio/bridal/BRmakeup1.jpg`
- **Naming Convention:** `BRmakeup[number].jpg` or `BRTmakeup[number].jpg` (Traditional)

#### 2. Engagement Makeup
- **Category Name:** `Engagement`
- **Upload Path:** `/images/portfolio/engagement/`
- **Example:** `/images/portfolio/engagement/ENmakeup1.jpg`
- **Naming Convention:** `ENmakeup[number].jpg`

#### 3. Reception Makeup
- **Category Name:** `Reception`
- **Upload Path:** `/images/portfolio/reception/`
- **Example:** `/images/portfolio/reception/RCmakeup1.jpg`
- **Naming Convention:** `RCmakeup[number].jpg`

#### 4. Glam Makeup
- **Category Name:** `Glam`
- **Upload Path:** `/images/portfolio/glam/`
- **Example:** `/images/portfolio/glam/GLmakeup1.jpg`
- **Naming Convention:** `GLmakeup[number].jpg`

#### 5. Self Makeup
- **Category Name:** `Self Makeup`
- **Upload Path:** `/images/portfolio/self-makeup/`
- **Example:** `/images/portfolio/self-makeup/SMmakeup1.jpg`
- **Naming Convention:** `SMmakeup[number].jpg`

#### 6. Teen Makeup
- **Category Name:** `Teen Makeup`
- **Upload Path:** `/images/portfolio/teen-makeup/`
- **Example:** `/images/portfolio/teen-makeup/TNmakeup1.jpg`
- **Naming Convention:** `TNmakeup[number].jpg`

#### 7. Fantasy Makeup
- **Category Name:** `Fantasy`
- **Upload Path:** `/images/portfolio/fantasy/`
- **Example:** `/images/portfolio/fantasy/FNmakeup1.jpg`
- **Naming Convention:** `FNmakeup[number].jpg`

#### 8. Bronze Makeup
- **Category Name:** `Bronze`
- **Upload Path:** `/images/portfolio/bronze/`
- **Example:** `/images/portfolio/bronze/BZmakeup1.jpg`
- **Naming Convention:** `BZmakeup[number].jpg`

#### 9. Model Bride
- **Category Name:** `Model Bride`
- **Upload Path:** `/images/portfolio/model-bride/`
- **Example:** `/images/portfolio/model-bride/MBmakeup1.jpg`
- **Naming Convention:** `MBmakeup[number].jpg`

---

### 💇 HAIR PORTFOLIO

#### 10. Hair-do Gallery
- **Category Name:** `Hair-do Gallery`
- **Upload Path:** `/images/portfolio/hair-do/`
- **Example:** `/images/portfolio/hair-do/HDhair1.jpg`
- **Naming Convention:** `HDhair[number].jpg`

#### 11. Keratin Treatment
- **Category Name:** `Keratin`
- **Upload Path:** `/images/portfolio/keratin/`
- **Example:** `/images/portfolio/keratin/KRhair1.jpg`
- **Naming Convention:** `KRhair[number].jpg`

#### 12. Rebonding
- **Category Name:** `Rebonding`
- **Upload Path:** `/images/portfolio/rebonding/`
- **Example:** `/images/portfolio/rebonding/RBhair1.jpg`
- **Naming Convention:** `RBhair[number].jpg`

#### 13. Botox Treatment
- **Category Name:** `Botox`
- **Upload Path:** `/images/portfolio/botox/`
- **Example:** `/images/portfolio/botox/BTXhair1.jpg`
- **Naming Convention:** `BTXhair[number].jpg`

#### 14. Smoothening
- **Category Name:** `Smoothening`
- **Upload Path:** `/images/portfolio/smoothening/`
- **Example:** `/images/portfolio/smoothening/SMhair1.jpg`
- **Naming Convention:** `SMhair[number].jpg`

#### 15. Hairstyles
- **Category Name:** `Hairstyles`
- **Upload Path:** `/images/portfolio/hairstyles/`
- **Example:** `/images/portfolio/hairstyles/HShair1.jpg`
- **Naming Convention:** `HShair[number].jpg`

---

### 💅 SKIN & NAILS PORTFOLIO

#### 16. Nail Art
- **Category Name:** `Nail Art`
- **Upload Path:** `/images/portfolio/nail-art/`
- **Example:** `/images/portfolio/nail-art/NAnail1.jpg`
- **Naming Convention:** `NAnail[number].jpg`

#### 17. Nail Extension
- **Category Name:** `Nail Extension`
- **Upload Path:** `/images/portfolio/nail-extension/`
- **Example:** `/images/portfolio/nail-extension/NEnail1.jpg`
- **Naming Convention:** `NEnail[number].jpg`

#### 18. Facials
- **Category Name:** `Facials`
- **Upload Path:** `/images/portfolio/facials/`
- **Example:** `/images/portfolio/facials/FCskin1.jpg`
- **Naming Convention:** `FCskin[number].jpg`

#### 19. Manicure-Pedicure
- **Category Name:** `Manicure-Pedicure`
- **Upload Path:** `/images/portfolio/manicure-pedicure/`
- **Example:** `/images/portfolio/manicure-pedicure/MPnail1.jpg`
- **Naming Convention:** `MPnail[number].jpg`

#### 20. Waxing
- **Category Name:** `Waxing`
- **Upload Path:** `/images/portfolio/waxing/`
- **Example:** `/images/portfolio/waxing/WXskin1.jpg`
- **Naming Convention:** `WXskin[number].jpg`

---

## 🔧 Technical Implementation

### Database Schema (Portfolio Model)
```javascript
images: [{
  url: String,        // Path: /images/portfolio/[subcategory]/[filename]
  caption: String,    // Optional image caption
  isBefore: Boolean   // For before-after slider
}]
```

### Static File Serving
The backend serves images from:
```javascript
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

However, portfolio images are served from the frontend's public directory:
```
frontend/public/images/portfolio/
```

---

## 📝 How to Add New Photos

### Step 1: Prepare Your Image
- Optimize image size (recommended: max 1920px width)
- Use JPG format for photos
- Follow naming convention for the category

### Step 2: Place Image in Correct Folder
```bash
# Example for Bridal Makeup
frontend/public/images/portfolio/bridal/BRmakeup9.jpg

# Example for Nail Art
frontend/public/images/portfolio/nail-art/NAnail5.jpg
```

### Step 3: Add to Database
Use the seed script or admin panel to add the portfolio item:

```javascript
{
  title: 'Bridal Makeup 9',
  category: 'Bridal',
  images: [{ 
    url: '/images/portfolio/bridal/BRmakeup9.jpg',
    caption: 'Beautiful bridal look'
  }],
  featured: false
}
```

---

## 🎯 Quick Reference Table

| Main Category | Subcategory | Folder Name | Prefix |
|--------------|-------------|-------------|--------|
| Makeup | Bridal | `bridal/` | BR |
| Makeup | Engagement | `engagement/` | EN |
| Makeup | Reception | `reception/` | RC |
| Makeup | Glam | `glam/` | GL |
| Makeup | Self Makeup | `self-makeup/` | SM |
| Makeup | Teen Makeup | `teen-makeup/` | TN |
| Makeup | Fantasy | `fantasy/` | FN |
| Makeup | Bronze | `bronze/` | BZ |
| Makeup | Model Bride | `model-bride/` | MB |
| Hair | Hair-do Gallery | `hair-do/` | HD |
| Hair | Keratin | `keratin/` | KR |
| Hair | Rebonding | `rebonding/` | RB |
| Hair | Botox | `botox/` | BTX |
| Hair | Smoothening | `smoothening/` | SM |
| Hair | Hairstyles | `hairstyles/` | HS |
| Skin/Nails | Nail Art | `nail-art/` | NA |
| Skin/Nails | Nail Extension | `nail-extension/` | NE |
| Skin/Nails | Facials | `facials/` | FC |
| Skin/Nails | Manicure-Pedicure | `manicure-pedicure/` | MP |
| Skin/Nails | Waxing | `waxing/` | WX |

---

## ⚠️ Important Notes

1. **Case Sensitivity:** Folder names should be lowercase with hyphens
2. **File Extensions:** Use `.jpg`, `.jpeg`, or `.png`
3. **Path Format:** Always start with `/images/portfolio/`
4. **No Spaces:** Use hyphens instead of spaces in folder names
5. **Consistent Naming:** Follow the prefix convention for easy organization

---

## 🚀 Admin Upload via Dashboard

When using the Admin Dashboard:
1. Select the correct category from dropdown
2. Upload image (it will be automatically placed in the correct folder)
3. Add title, description, and tags
4. Mark as featured if needed
5. Save the portfolio item

The system will automatically handle the path structure!

---

## 📞 Need Help?

If you encounter issues with image uploads:
- Check folder permissions
- Verify image path in database matches actual file location
- Use the cleanup script: `node backend/scripts/cleanupBrokenImages.js`
- Check portfolio items: `node backend/scripts/checkPortfolioItems.js`
