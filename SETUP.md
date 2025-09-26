# Review System Setup Guide

## 🚀 **What's New**

I've completely removed all hardcoded reviews and implemented a **dynamic, database-driven review system** where users can:

✅ **Add their own reviews** with ratings and comments  
✅ **Edit their existing reviews** anytime  
✅ **Delete their own reviews** if needed  
✅ **View all reviews** for each trek  
✅ **Real-time updates** when reviews change  

## 🗄️ **Database Changes**

The review system now uses the existing Prisma schema with proper relationships:
- Users can only edit/delete their own reviews
- Reviews are linked to specific treks
- All review data is stored in PostgreSQL

## 🛠️ **Setup Instructions**

### 1. **Environment Variables**
Create a `.env.local` file:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/trekking_db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data (optional)
npm run db:seed
```

### 3. **Start Development Server**
```bash
npm run dev
```

## 🔧 **How It Works**

### **API Endpoints**
- `GET /api/reviews?trekId=X` - Fetch reviews for a trek
- `POST /api/reviews` - Create a new review
- `PUT /api/reviews/[id]` - Update existing review
- `DELETE /api/reviews/[id]` - Delete review

### **Security Features**
- Users can only edit/delete their own reviews
- Authentication required for all review operations
- Input validation and error handling

### **User Experience**
- **Write Review**: Simple form with star rating and comment
- **Edit Review**: Click edit button to modify existing review
- **Delete Review**: Remove review with confirmation dialog
- **Real-time Updates**: Reviews update immediately after changes

## 📱 **Components Created**

1. **`ReviewForm.tsx`** - Main review component with add/edit/delete functionality
2. **`useReviews.ts`** - Custom hook for managing review state
3. **API Routes** - Backend endpoints for review operations
4. **Database Schema** - Proper relationships between users, treks, and reviews

## 🎯 **Features**

- **Star Rating System**: 1-5 star ratings with visual feedback
- **Comment System**: Optional text comments for detailed feedback
- **User Management**: Users can only manage their own reviews
- **Responsive Design**: Works perfectly on all devices
- **Real-time Updates**: Changes reflect immediately
- **Error Handling**: Proper error messages and validation

## 🔒 **Security**

- **Authentication Required**: Must be signed in to review
- **Ownership Validation**: Users can only edit their own reviews
- **Input Sanitization**: All inputs are validated and sanitized
- **Rate Limiting**: Prevents spam reviews

## 🚀 **Ready to Use**

The review system is now fully functional and ready for production use. Users can:
- Browse treks and see real reviews
- Leave their own reviews after completing treks
- Edit or delete their reviews as needed
- See all community feedback for each adventure

**No more hardcoded reviews - everything is now dynamic and user-generated!** 🎉
