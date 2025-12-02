# Admin Panel User Guide

## Login Credentials
- **Email:** sneha@gmail.com
- **Password:** sneha123
- **URL:** http://localhost:3000/admin/login

## Admin Dashboard Features

### 1. Statistics Overview
The dashboard displays:
- Total Portfolio Items
- Total Bookings
- Total Testimonials

### 2. Recent Bookings
View the 5 most recent bookings with:
- Client name
- Makeup type
- Event date
- Booking status

### 3. Upload Portfolio Images

**To add a new portfolio image:**

1. Click the "Upload Portfolio Image" button
2. Fill in the form:
   - **Title:** Name of the work (e.g., "Bridal Makeup - Priya's Wedding")
   - **Category:** Select from Bridal, Engagement, Glam, Reception, or Fashion/Art
   - **Image URL:** Path to the image (e.g., `/images/portfolio/bridal/BRmakeup1.jpg`)
   - **Client Name:** (Optional) Name of the client
   - **Description:** (Optional) Brief description of the work

3. Click "Upload" to add the image to your portfolio

**Important:** You have THREE options for image URLs:

**Option 1 - Local Images:**
- Place your image file in the `frontend/public/images/portfolio/[category]/` folder
- Use the path format: `/images/portfolio/[category]/filename.jpg`

**Option 2 - Google Drive (Recommended for Easy Management):**
- Upload image to Google Drive
- Make it public (Anyone with the link)
- Convert link to direct format: `https://drive.google.com/uc?export=view&id=FILE_ID`
- See GOOGLE_DRIVE_IMAGE_GUIDE.md for detailed instructions

**Option 3 - Any External URL:**
- Use any image hosting service (Imgur, Cloudinary, etc.)
- Just paste the direct image URL

### 4. View All Bookings

Click "View All Bookings" to see complete booking details including:
- Client name
- Email address
- Phone number
- Makeup type
- Event date
- Booking status

Click "Hide All Bookings" to collapse the view.

## Image Upload Instructions

### Step-by-Step Process:

1. **Prepare Your Image:**
   - Ensure the image is high quality
   - Recommended size: 1200x1600px or similar portrait ratio
   - Format: JPG or PNG

2. **Place Image in Correct Folder:**
   ```
   frontend/public/images/portfolio/
   ├── bridal/       ← Bridal makeup images
   ├── engagement/   ← Engagement makeup images
   ├── glam/         ← Glam makeup images
   ├── reception/    ← Reception makeup images
   └── fashion/      ← Fashion/Art makeup images
   ```

3. **Name Your Image:**
   - Use descriptive names: `BRmakeup1.jpg`, `GLmakeup5.jpg`, etc.
   - No spaces in filenames

4. **Upload via Admin Panel:**
   - Login to admin dashboard
   - Click "Upload Portfolio Image"
   - Enter the image path: `/images/portfolio/bridal/BRmakeup1.jpg`
   - Fill in other details
   - Submit

5. **Verify:**
   - Go to Portfolio page to see your new image
   - Check if it appears in the correct category

## Managing Content

### Bookings
- View all client bookings
- See contact information
- Check event dates and status
- Export data if needed (contact developer for this feature)

### Portfolio
- Add new images via upload modal
- Images are automatically categorized
- Featured images can be marked (contact developer)

## Tips for Best Results

1. **Image Quality:** Always use high-resolution images
2. **Consistent Naming:** Use a consistent naming pattern for easy management
3. **Regular Backups:** Keep backup copies of all images
4. **Client Privacy:** Be mindful of client information when adding names
5. **Categories:** Choose the most appropriate category for each image

## Troubleshooting

**Image not showing?**
- Check if the file path is correct
- Verify the image is in the public folder
- Refresh the browser cache (Ctrl+F5)

**Can't login?**
- Verify credentials: sneha@gmail.com / sneha123
- Check if backend server is running
- Clear browser cookies and try again

**Upload not working?**
- Ensure you're logged in
- Check internet connection
- Verify the image path format

## Footer Links

All footer links are now working:
- ✅ Portfolio
- ✅ Services
- ✅ Client Work
- ✅ Blog
- ✅ About
- ✅ Admin Login
- ✅ All service links redirect to Services page

## Need Help?

If you encounter any issues or need additional features, contact your developer.


## Google Drive Quick Start

### Converting Google Drive Links (Easy Method):

1. **Upload to Google Drive** → Share → "Anyone with the link"

2. **Copy the link** - it looks like:
   ```
   https://drive.google.com/file/d/1ABC123XYZ456/view?usp=sharing
   ```

3. **Extract the FILE_ID** (the part between `/d/` and `/view`):
   ```
   1ABC123XYZ456
   ```

4. **Create direct link**:
   ```
   https://drive.google.com/uc?export=view&id=1ABC123XYZ456
   ```

5. **Paste in admin panel** and upload!

### Example:
- ❌ Wrong: `https://drive.google.com/file/d/1ABC123XYZ456/view`
- ✅ Right: `https://drive.google.com/uc?export=view&id=1ABC123XYZ456`

For detailed instructions, see **GOOGLE_DRIVE_IMAGE_GUIDE.md**
