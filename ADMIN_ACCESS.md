# Admin Access Information

## Admin Credentials

**Email:** sneha@gmail.com  
**Password:** sneha123

## Important Notes

- ✅ **Single Admin Account**: Only ONE admin account exists - no registration allowed
- ✅ **No Public Registration**: There is no registration endpoint - admin-only access
- ✅ **Secure Access**: The admin panel is protected and requires authentication
- ✅ **Admin Dashboard**: Access at http://localhost:3000/admin/login

## Admin Capabilities

The admin can:
- View and manage all bookings
- Approve/reject testimonials
- Manage portfolio items
- Manage blog posts
- Manage services
- View contact form submissions

## Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Password Hashing**: Passwords are hashed using bcrypt
3. **Protected Routes**: All admin routes require valid authentication
4. **No Registration**: No public registration endpoint exists

## How to Reset Admin Password

If you need to change the admin password:

1. Update the password in `backend/scripts/createAdmin.js`
2. Run: `cd backend && node scripts/createAdmin.js`
3. The script will delete the old admin and create a new one with updated credentials

## Access the Admin Panel

1. Navigate to: http://localhost:3000/admin/login
2. Enter email: sneha@gmail.com
3. Enter password: sneha123
4. Click "Login"

You will be redirected to the admin dashboard where you can manage all content.
