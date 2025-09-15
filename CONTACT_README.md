# Contact Form System

## Overview

The contact form system allows users to submit inquiries through the website, with all submissions stored in a PostgreSQL database for management and follow-up.

## Features

### ✅ Implemented Features

- **Contact Form**: User-friendly form with validation
- **PostgreSQL Storage**: All submissions stored in Neon database
- **Data Validation**: Server-side validation with Zod
- **API Endpoints**: RESTful API for form submission and management
- **Error Handling**: Comprehensive error handling and user feedback
- **Metadata Tracking**: IP address, user agent, and timestamps

### 🔄 Form Fields

- **First Name** (required)
- **Last Name** (required)
- **Email** (required, validated)
- **Company** (optional)
- **Role** (dropdown: Data Analyst, Data Engineer, Data Scientist, Manager, Executive, Other)
- **Message** (required)

### 📊 Database Schema

```sql
CREATE TABLE contact_messages (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  role TEXT,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);
```

### 🚀 API Endpoints

#### Submit Contact Form
```http
POST /api/contact
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "role": "manager",
  "message": "I'm interested in learning more about Skopeo."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Contact message submitted successfully",
  "data": {
    "id": "uuid-here",
    "createdAt": "2025-09-15T21:08:08.250Z"
  }
}
```

#### Get All Messages (Admin)
```http
GET /api/contact
```

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid-here",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "company": "Acme Corp",
      "role": "manager",
      "message": "I'm interested in learning more about Skopeo.",
      "ipAddress": "::1",
      "userAgent": "Mozilla/5.0...",
      "status": "new",
      "createdAt": "2025-09-15T21:08:08.250Z",
      "updatedAt": "2025-09-15T21:08:08.250Z"
    }
  ]
}
```

#### Get Specific Message
```http
GET /api/contact/:id
```

#### Update Message Status
```http
PATCH /api/contact/:id/status
Content-Type: application/json

{
  "status": "contacted"
}
```

**Status Options:** `new`, `contacted`, `resolved`

## 🛠️ Technical Implementation

### Database Setup

1. **Neon PostgreSQL Database**
   - Connection string stored in `.env` file
   - Tables created with `npm run db:push`

2. **Environment Variables**
   ```bash
   DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
   ```

### File Structure

```
├── client/src/pages/contact.tsx          # Contact form UI
├── server/routes.ts                      # API endpoints
├── server/storage.ts                     # Database operations
├── shared/schema.ts                      # Database schema & validation
└── .env                                  # Environment variables
```

### Dependencies

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL, Drizzle ORM
- **Validation**: Zod
- **Environment**: dotenv

## 🧪 Testing

### Manual Testing

1. **Form Submission**
   ```bash
   # Visit the contact form
   open http://localhost:3000/contact
   
   # Fill out and submit the form
   # Verify success message appears
   ```

2. **API Testing**
   ```bash
   # Submit via API
   curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Test message"}'
   
   # View all messages
   curl http://localhost:3000/api/contact
   ```

3. **Database Verification**
   - Check Neon SQL Editor: https://console.neon.tech
   - Run: `SELECT * FROM contact_messages ORDER BY created_at DESC;`

### Validation Testing

Test with invalid data to ensure validation works:
- Empty required fields
- Invalid email addresses
- Very long messages

## 📈 Usage Statistics

- **Total Submissions**: Track via API endpoint
- **Response Time**: Monitor via server logs
- **Status Tracking**: new → contacted → resolved workflow

## 🔮 Future Enhancements

### Planned Features

1. **Email Notifications**
   - Send email to team when form is submitted
   - Auto-responder to user

2. **Admin Dashboard**
   - Web interface for viewing messages
   - Status management
   - Search and filtering

3. **Analytics**
   - Submission trends
   - Response time metrics
   - Conversion tracking

4. **Advanced Features**
   - File uploads
   - Spam protection (reCAPTCHA)
   - Integration with CRM systems

## 🚀 Deployment

### Production Setup

1. **Environment Variables**
   ```bash
   DATABASE_URL=your_production_database_url
   NODE_ENV=production
   ```

2. **Database Migration**
   ```bash
   npm run db:push
   ```

3. **Build & Deploy**
   ```bash
   npm run build
   npm start
   ```

### Vercel Deployment

The project is configured for Vercel deployment with:
- `vercel.json` configuration
- Environment variables in Vercel dashboard
- Automatic builds on git push

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check `DATABASE_URL` in `.env` file
   - Verify Neon database is active
   - Ensure `dotenv` is properly configured

2. **Form Validation Errors**
   - Check Zod schema in `shared/schema.ts`
   - Verify frontend form field names match API expectations

3. **Messages Not Appearing**
   - Check if server is using PostgreSQL (not in-memory storage)
   - Verify database tables exist
   - Check server logs for errors

### Debug Commands

```bash
# Check database connection
npm run db:push

# View server logs
npm run dev

# Test API endpoints
curl http://localhost:3000/api/health
```

## 📝 Development Notes

- **Branch**: `contact`
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion

## 👥 Team

- **Developer**: Vansh Jain
- **Database**: Neon PostgreSQL
- **Deployment**: Vercel

---

*Last updated: September 15, 2025*
