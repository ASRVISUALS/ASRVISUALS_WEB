# WordPress-Like Features - Admin Panel

## 🎯 Overview
Your admin panel now has WordPress-like page management with advanced features for creating, editing, and managing pages.

---

## ✨ Main Features

### 1. **Pages Management Dashboard**
- View all pages in a sortable table
- Filter by status (Draft, Published, Scheduled)
- Search pages by title or slug
- Bulk selection and deletion
- Quick action buttons (Edit, Duplicate, Delete)

### 2. **Create & Edit Pages**
Full WordPress-style page editor with:

#### **Content Section**
- **Title**: Main page heading
- **Slug**: Auto-generated URL (editable)
- **Excerpt**: Brief description/summary
- **Content**: HTML/Markdown content editor
  - Support for rich text, HTML, images
  - Monospace editor for clean code

#### **Page Settings**
- **Status Control**:
  - Draft (work in progress)
  - Published (live on site)
  - Scheduled (future publication)
  
- **Template Selection**:
  - Default (standard layout)
  - Full Width (no sidebars)
  - Landing Page (hero-focused)
  - Custom (your own templates)

- **Featured Image**: URL for page hero/thumbnail
- **Display Order**: Numeric sorting for menu
- **Show in Menu**: Toggle navigation visibility

#### **SEO Settings** 🔍
- Meta Title (search engine title)
- Meta Description (search snippet)
- OG Image (social media preview)
- Keywords (comma-separated tags)

#### **Advanced Features** ⚙️
- **Custom CSS**: Page-specific styling
- **Custom JavaScript**: Interactive elements
- **Parent Page**: Create page hierarchies
- **Publish Date**: Schedule future content
- **Author Tracking**: Automatic author assignment

---

## 🚀 User Workflows

### Creating a New Page
1. Click "➕ Add New Page"
2. Enter title (slug auto-generates)
3. Add content and excerpt
4. Choose template and status
5. Configure SEO settings
6. Add custom CSS/JS if needed
7. Click "💾 Save Page"

### Editing Existing Pages
1. Find page in list
2. Click ✏️ Edit button
3. Make changes
4. Click "💾 Save Page"
5. Preview refreshes automatically (if split view)

### Duplicating Pages
1. Click 📋 Duplicate on any page
2. Creates copy with "(Copy)" suffix
3. Status automatically set to Draft
4. Edit and publish when ready

### Bulk Operations
1. Check boxes for multiple pages
2. Click "🗑️ Delete (X)" button
3. Confirm deletion
4. All selected pages removed

---

## 🎨 Live Preview Features

From Content Blocks page:
- **Split View**: Edit + Live Preview side-by-side
- **Auto-Refresh**: Preview updates after saving
- **Custom URL**: Preview any page (localhost or production)
- **Inspect Mode**: Right-click iframe → Inspect to edit styles
- **View Modes**:
  - 📝 Edit Only (focus on content)
  - ⚡ Split View (edit + preview)
  - 👁️ Preview Only (full-screen preview)

---

## 📋 Admin Navigation

Updated sidebar includes:
- 📄 **Pages** - Manage all site pages
- 📝 **Blog** - Manage blog posts
- 🧩 **Content Blocks** - Dynamic content sections
- 📧 **Contacts** - Form submissions
- 📅 **Bookings** - Appointment requests
- 👥 **Users** - User management

---

## 🔧 Backend API Endpoints

### Pages API (`/api/pages`)
- `GET /api/pages` - List all pages
- `GET /api/pages/:id` - Get single page
- `GET /api/pages/slug/:slug` - Get by slug (public)
- `POST /api/pages` - Create new page
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page
- `POST /api/pages/:id/duplicate` - Duplicate page
- `POST /api/pages/bulk-delete` - Delete multiple pages

**Query Parameters:**
- `?status=draft|published|scheduled` - Filter by status
- `?limit=50` - Limit results
- `?sort=updatedAt|-createdAt` - Sort results

---

## 💾 Database Schema

### Page Model
```typescript
{
  title: string              // Page title
  slug: string               // URL-friendly identifier (unique)
  content: string            // HTML/Markdown content
  excerpt?: string           // Brief summary (max 300 chars)
  status: enum               // draft | published | scheduled
  template: enum             // default | full-width | landing | custom
  featuredImage?: string     // Image URL
  seo: {                     // SEO metadata
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
    keywords?: string[]
  }
  author: ObjectId           // User reference
  publishDate?: Date         // For scheduled posts
  order: number              // Menu ordering (default: 0)
  showInMenu: boolean        // Navigation visibility
  parentPage?: ObjectId      // For page hierarchies
  customCSS?: string         // Page-specific styles
  customJS?: string          // Page-specific scripts
  createdAt: Date            // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

---

## 🔐 Security & Permissions

- All page endpoints require authentication (`protect` middleware)
- Only admin users can create/edit/delete pages (`restrictTo('admin')`)
- Public can only view published pages via slug
- Author automatically assigned from JWT token

---

## 🎯 Next Steps

### For Local Development:
1. Admin panel is running at http://localhost:5173
2. Navigate to "📄 Pages" in sidebar
3. Create your first page
4. Test all features

### For Production (Vercel):
1. Ensure backend environment variables are set
2. Redeploy backend to include page routes
3. Admin panel will automatically connect
4. Create pages at https://admin-six-steel.vercel.app

---

## 🐛 Troubleshooting

**Can't create pages?**
- Check MongoDB connection
- Verify JWT token is valid
- Ensure user has admin role

**Duplicate slug error?**
- Each page needs unique slug
- Edit slug to make it different

**Preview not loading?**
- Check preview URL is correct
- Verify CORS settings allow iframe
- Try manual refresh button

**Changes not saving?**
- Check network tab for errors
- Verify backend is running
- Check MongoDB connection

---

## 📚 WordPress Comparison

| Feature | WordPress | Your Admin Panel | Status |
|---------|-----------|------------------|--------|
| Create Pages | ✅ | ✅ | Implemented |
| Edit Pages | ✅ | ✅ | Implemented |
| Delete Pages | ✅ | ✅ | Implemented |
| Page Templates | ✅ | ✅ | 4 templates |
| SEO Settings | ✅ | ✅ | Full support |
| Custom CSS/JS | ✅ | ✅ | Implemented |
| Live Preview | Plugin | ✅ | Built-in |
| Bulk Actions | ✅ | ✅ | Delete only |
| Page Hierarchy | ✅ | ✅ | Parent support |
| Scheduled Posts | ✅ | ✅ | Implemented |
| Media Library | ✅ | ⏳ | Use URLs |
| Visual Editor | Plugin | ⏳ | HTML editor |
| Revisions | ✅ | ⏳ | Future |

---

## 🚀 Future Enhancements

Potential additions:
- [ ] Rich text WYSIWYG editor (TinyMCE/CKEditor)
- [ ] Media library with upload
- [ ] Page revisions/history
- [ ] Built-in image optimization
- [ ] Drag-and-drop page builder blocks
- [ ] A/B testing support
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] Custom fields/meta boxes
- [ ] Page templates with variables

---

## 📞 Support

For issues or questions:
- Check console logs for errors
- Verify environment variables
- Test API endpoints directly
- Review this documentation

**Admin Access:**
- URL: http://localhost:5173 (local) or https://admin-six-steel.vercel.app
- Email: amitrana748095@gmail.com
- Password: AmitraNa2
