
# Case Studies Management System

## Overview
Add a complete case studies management system to the admin panel, allowing you to create, edit, delete, and publish case studies dynamically - similar to the existing blog management functionality.

## What Will Be Built

### 1. Database Schema
Create a new `case_studies` table with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| title | text | Case study title |
| slug | text | URL-friendly identifier |
| client_name | text | Client/project name |
| client_title | text | Client's role/title |
| description | text | Brief summary |
| content | text | Full HTML content |
| category | text | Healthcare, Finance, etc. |
| cover_image_url | text | Featured image |
| tags | text[] | Array of tags (e.g., SEO, Web Dev) |
| metrics | jsonb | Key results (rankings, stats) |
| featured | boolean | Show on homepage |
| published | boolean | Public visibility |
| created_at | timestamp | Creation date |
| updated_at | timestamp | Last modified |

### 2. Admin Panel Updates
Extend the existing admin interface with:

- **Tab Navigation**: Switch between "Blog Posts" and "Case Studies"
- **Case Studies Table**: List all case studies with title, client, status, date
- **Actions**: Edit, Delete, Publish/Unpublish, Feature/Unfeature
- **Case Study Editor Dialog**: Full form with:
  - Title, client name, client title
  - Slug (auto-generated)
  - Category and tags selection
  - Rich description
  - Cover image upload
  - Metrics editor (key-value pairs for stats)
  - Full content editor (HTML)
  - Published and Featured toggles

### 3. Public-Facing Pages
Update the case studies pages to:

- **Case Studies Index**: Dynamically load case studies from database
- **Individual Case Study Pages**: Dynamic routing (`/case-studies/:slug`)
- Keep Dr. Parash case study as seed data in the database

### 4. Security
- RLS policies ensuring only admins can manage case studies
- Public read access for published case studies only

## File Changes

### New Files
```text
src/components/admin/CaseStudyEditor.tsx    - Editor dialog
src/pages/CaseStudyPage.tsx                  - Dynamic case study viewer
```

### Modified Files
```text
src/pages/Admin.tsx                          - Add tabs and case study management
src/pages/CaseStudies.tsx                    - Fetch from database
src/App.tsx                                  - Add dynamic route
```

### Database Migration
- Create `case_studies` table
- Add RLS policies (admin write, public read for published)
- Optional: Seed with Dr. Parash case study data

## Technical Details

### Metrics Storage Format (JSONB)
```json
{
  "items": [
    { "label": "Google Ranking", "value": "#1" },
    { "label": "Years Experience", "value": "30+" },
    { "label": "Digital Authority", "value": "0→1" }
  ]
}
```

### RLS Policies
- `Admins can manage case studies` - Full CRUD for admin role
- `Anyone can view published case studies` - SELECT where published = true

### Dynamic Routing
```text
/case-studies           → Lists all published case studies
/case-studies/:slug     → Shows individual case study
```

## Implementation Order
1. Create database table and RLS policies
2. Create CaseStudyEditor component
3. Update Admin page with tabs and case study management
4. Update CaseStudies index page to fetch from database
5. Create dynamic CaseStudyPage component
6. Update routing in App.tsx
7. Optionally seed Dr. Parash data into database
