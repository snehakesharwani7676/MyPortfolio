# 📸 How to Add Your Makeup Images

## 📁 Folder Structure

Your images are organized in these folders:

```
MY_IMAGES/
├── 1-Bridal-Makeup/          ← Paste bridal makeup photos here
├── 2-Engagement-Makeup/      ← Paste engagement makeup photos here
├── 3-Glam-Makeup/            ← Paste glam makeup photos here
├── 4-Reception-Makeup/       ← Paste reception makeup photos here
├── 5-Fashion-Art-Makeup/     ← Paste fashion/art makeup photos here
├── 6-Profile-Shoots/         ← Paste profile shoot photos here
├── 7-Hero-Images/            ← Paste 2 best photos for homepage banner
└── 8-About-Me/               ← Paste your personal photo here
```

---

## 🎯 Step-by-Step Instructions

### Step 1: Paste Your Images

1. **Bridal Makeup** (Folder: `1-Bridal-Makeup`)
   - Paste your bridal makeup photos
   - Name them: `bridal1.jpg`, `bridal2.jpg`, `bridal3.jpg`, etc.
   - Add as many as you want!

2. **Engagement Makeup** (Folder: `2-Engagement-Makeup`)
   - Paste your engagement makeup photos
   - Name them: `engagement1.jpg`, `engagement2.jpg`, etc.

3. **Glam Makeup** (Folder: `3-Glam-Makeup`)
   - Paste your glam makeup photos
   - Name them: `glam1.jpg`, `glam2.jpg`, `glam3.jpg`, etc.

4. **Reception Makeup** (Folder: `4-Reception-Makeup`)
   - Paste your reception makeup photos
   - Name them: `reception1.jpg`, `reception2.jpg`, etc.

5. **Fashion/Art Makeup** (Folder: `5-Fashion-Art-Makeup`)
   - Paste your fashion and artistic makeup photos
   - Name them: `fashion1.jpg`, `fashion2.jpg`, etc.

6. **Profile Shoots** (Folder: `6-Profile-Shoots`)
   - Paste your profile shoot photos
   - Name them: `profile1.jpg`, `profile2.jpg`, etc.

7. **Hero Images** (Folder: `7-Hero-Images`)
   - Paste your 2 BEST photos for homepage banner
   - Name them: `hero1.jpg` and `hero2.jpg`
   - These will be the first images visitors see!

8. **About Me** (Folder: `8-About-Me`)
   - Paste your personal photo
   - Name it: `about-me.jpg`
   - This will appear on your About page

---

## 📝 Naming Rules

### ✅ GOOD Names:
- `bridal1.jpg`
- `glam5.jpg`
- `engagement2.jpg`
- `hero1.jpg`
- `about-me.jpg`

### ❌ BAD Names:
- `IMG_20240101.jpg` (not descriptive)
- `WhatsApp Image 2024.jpg` (spaces and special characters)
- `photo.jpg` (too generic)

### 💡 Tips:
- Use lowercase letters
- Use numbers for multiple images
- Use hyphens (-) instead of spaces
- Keep names simple and descriptive

---

## 🚀 After Adding Images

Once you've pasted all your images in the correct folders, run this command:

```bash
# From the project root folder
node scripts/copy-images.js
```

This will automatically:
1. Copy all images to the website
2. Organize them properly
3. Make them visible on your portfolio

---

## 📊 Recommended Image Counts

| Category | Minimum | Recommended | Maximum |
|----------|---------|-------------|---------|
| Bridal Makeup | 5 | 8-12 | Unlimited |
| Engagement | 3 | 5-8 | Unlimited |
| Glam Makeup | 5 | 10-15 | Unlimited |
| Reception | 3 | 5-8 | Unlimited |
| Fashion/Art | 3 | 5-10 | Unlimited |
| Profile Shoots | 2 | 3-5 | Unlimited |
| Hero Images | 2 | 2-3 | 5 |
| About Me | 1 | 1 | 1 |

---

## 🎨 Image Quality Tips

### Best Practices:
✅ Use high-resolution images (at least 1920x1080)
✅ Make sure faces are clearly visible
✅ Good lighting in photos
✅ Professional quality
✅ JPG or PNG format
✅ File size under 5MB per image

### What to Avoid:
❌ Blurry or pixelated images
❌ Dark or poorly lit photos
❌ Images with watermarks from other artists
❌ Screenshots or low-quality images
❌ Images with faces cut off

---

## 🔄 How Images Will Appear on Website

### Homepage:
- **Hero Section**: Shows `hero1.jpg` and `hero2.jpg` in rotating banner
- **Categories**: Shows first image from each category
- **Featured Work**: Shows your best work

### Portfolio Page:
- Shows ALL images from all categories
- Organized by category (Bridal, Glam, etc.)
- Clickable lightbox view
- Filter by category

### About Page:
- Shows `about-me.jpg` as your profile picture

### Services Page:
- Can use images from any category to showcase services

---

## 📱 Where to Find Your Images

After copying, your images will be in:
```
frontend/public/images/portfolio/
```

The website will automatically load them from there!

---

## 🆘 Need Help?

### Common Issues:

**Q: Images not showing?**
A: Make sure you ran `node scripts/copy-images.js` after adding images

**Q: Wrong image in wrong category?**
A: Check the folder name and image name match the category

**Q: Image looks stretched or cut off?**
A: Use high-resolution images (at least 1920x1080)

**Q: Too many images loading slowly?**
A: Compress images to under 1MB each using online tools

---

## ✨ Quick Start

1. **Paste your images** in the correct folders
2. **Name them properly** (bridal1.jpg, glam1.jpg, etc.)
3. **Run the copy script**: `node scripts/copy-images.js`
4. **Refresh your website**: http://localhost:3000
5. **See your images live!** 🎉

---

## 📞 Current Image Status

Your existing images are already in:
- `frontend/public/images/portfolio/`

You can:
- Replace them with new images
- Add more images
- Keep the existing ones

Just follow the naming convention and run the copy script!

---

**Happy uploading! Your portfolio will look amazing! 💄✨**
