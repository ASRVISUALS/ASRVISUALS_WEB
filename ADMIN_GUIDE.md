# Admin Dashboard - Quick Start Guide

## Overview

The ASRVisuals admin dashboard provides an easy-to-use interface for managing your website content, videos, blogs, and more without touching code.

**Access**: Go to `/admin` and login with your admin credentials.

---

## 🌐 Web Content Editor

**Purpose**: Update key website content (homepage, about, services, footer) instantly.

### How to Use:

1. Click the **Web Content** tab in admin dashboard
2. Select the section you want to edit from the left panel:
   - Hero Title
   - Hero Subtitle
   - About Summary
   - Services Introduction
   - Contact Message
   - Footer Tagline
   - Company Address
   - Company Email
   - Company Phone

3. Edit the text in the editor panel
4. Click **Save This Section** to save individual changes, or **Save All Changes** to save all at once
5. Changes appear on your website immediately

### Tips:
- Long text fields can span multiple paragraphs
- Use plain text (no HTML/Markdown required)
- All changes sync to your website in real-time

---

## 📹 Videos & Shorts Manager

**Purpose**: Add YouTube videos and short clips to your portfolio/work section with automatic metadata fetching.

### How to Add a Video:

1. Click the **Videos & Shorts** tab in admin dashboard
2. Fill in the form:
   - **Title**: Name of the video/project
   - **Category**: Select (design, development, marketing, branding)
   - **Description**: What the video shows
   - **Video URL**: Paste your YouTube link here (e.g., https://youtube.com/watch?v=...)
   - **Technologies**: Comma-separated list (e.g., After Effects, Premiere, React)

3. Click **Fetch Video Metadata** button
   - This automatically fills in:
     - Video title (if empty)
     - Thumbnail image from YouTube
     
4. Click **Add Video** to publish

### Automatic Features:
✅ YouTube thumbnail auto-fetches
✅ Video title auto-populates
✅ Instant preview on website

### Supported URLs:
- Standard YouTube: `https://youtube.com/watch?v=VIDEO_ID`
- YouTube Shorts: `https://youtube.com/shorts/VIDEO_ID`
- YouTube Full URL: `https://www.youtube.com/watch?v=VIDEO_ID&t=...`

---

## 📝 Blog Management

**Purpose**: Write and publish blog posts.

### How to Create a Blog Post:

1. Click the **Blog Management** tab
2. Click **Create New Post**
3. Fill in:
   - **Title**: Post headline
   - **Slug**: URL-friendly name (e.g., "amazing-project-story")
   - **Category**: Select category
   - **Description**: Short excerpt
   - **Content**: Full post content with markdown support
   - **Featured Image**: Upload or link to image
   - **Author**: Your name (auto-filled)
   - **Tags**: Separate with commas

4. Click **Publish** to go live

### Editing Existing Posts:
Click the post from the list → Make changes → Click **Update**

### Deleting Posts:
Click the post → Click **Delete** → Confirm

---

## 🎬 Portfolio Manager

**Purpose**: Showcase your projects, designs, and case studies.

### How to Add a Portfolio Item:

1. Click the **Videos & Shorts** or **Portfolio** section (same place)
2. Fill in portfolio details (same as videos above)
3. Add external link if needed (portfolio URL)
4. Click **Add Portfolio Item**

---

## 📧 Contact Requests

**Purpose**: Review and manage contact form submissions from your website.

### How to Use:

1. Click **Contact Requests** tab
2. View all incoming contact form submissions
3. Filter by:
   - Unread/Read status
   - Date range
   - Status (new, responding, resolved, spam)

4. Click a request to view full details:
   - Name, Email, Phone
   - Service(s) interested in
   - Project description
   - Timestamp

5. Mark as read/replied/resolved

### Note:
Contact forms submitted via Google Forms are stored in your Google Form responses. This view shows submissions sent through the custom website contact form.

---

## ⚙️ Site Settings

**Purpose**: Store global configuration values and custom settings.

### How to Use:

1. Click **Site Settings** tab
2. Existing settings are listed below
3. To **edit a setting**:
   - Find it in the list
   - Click in the text area
   - Make changes
   - Click **Save**

4. To **add a new setting**:
   - Fill in **Setting Key** (e.g., "instagram_url")
   - Fill in **Value** (e.g., "https://instagram.com/yourprofile")
   - Click **Add Setting**

### Common Settings:
- `instagram_url`: Your Instagram profile link
- `twitter_handle`: Twitter username
- `github_url`: GitHub profile
- `company_name`: Official business name
- `timezone`: Your timezone for dates

### Advanced Settings:
You can also store JSON for complex data:
```json
{
  "social_links": [
    {"platform": "instagram", "url": "https://instagram.com/..."},
    {"platform": "twitter", "url": "https://twitter.com/..."}
  ]
}
```

---

## 🔐 Security & Permissions

- Only users with **admin** or **owner** roles can access admin dashboard
- All changes are logged (for future audit trail)
- API requests are protected with JWT authentication
- Never share your admin login credentials

---

## Common Tasks

### Update Homepage Title
1. Go to **Web Content** tab
2. Click **Hero Title**
3. Edit the text
4. Click **Save This Section**

### Add a Client Case Study
1. Go to **Videos & Shorts**
2. Paste YouTube video link of your case study
3. Click **Fetch Video Metadata**
4. Fill in description and details
5. Click **Add Video**

### Publish a Blog Post
1. Go to **Blog Management**
2. Click **Create New Post**
3. Fill in title, content, image
4. Click **Publish**

### Review Website Feedback
1. Go to **Contact Requests**
2. Read through submissions
3. Reply to promising leads

---

## Tips & Best Practices

✅ **Do:**
- Update web content regularly to stay fresh
- Use clear, concise descriptions
- Add high-quality project images/thumbnails
- Respond to contact requests promptly
- Backup important data regularly

❌ **Don't:**
- Don't share admin login with non-team members
- Don't paste personal information in settings
- Don't delete old blog posts without backup
- Don't leave contact requests unread for weeks

---

## Troubleshooting

### "Failed to save" error
- Check your internet connection
- Verify you're still logged in
- Try refreshing the page
- Check browser console for errors (F12)

### YouTube metadata not fetching
- Verify the YouTube URL is valid and public
- Try a different video
- The YouTube video must be publicly available

### Can't access admin dashboard
- Verify you have admin or owner role
- Clear browser cookies and login again
- Check that backend API is running

### Blog post not appearing on website
- Check that "Published" status is enabled
- Wait a few seconds for cache to clear
- Try refreshing the website

---

## Need Help?

For more advanced features or issues:
1. Check backend logs in Vercel dashboard
2. Review API endpoints documentation
3. Contact your development team
