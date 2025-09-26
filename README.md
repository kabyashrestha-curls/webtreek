# TrekAdventures - Trekking Website

A modern, full-stack trekking website built with Next.js, featuring beautiful UI, user authentication, trek management, and booking capabilities.

## 🚀 Features

### Frontend
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Animations**: Smooth animations using Framer Motion
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Interactive Components**: Hover effects, transitions, and micro-interactions

### Backend & Database
- **Next.js 14**: Latest version with App Router
- **Prisma ORM**: Type-safe database operations
- **PostgreSQL**: Robust database for production use
- **Authentication**: NextAuth.js integration for user management

### Key Functionality
- **Trek Management**: Browse, search, and filter trekking adventures
- **User Authentication**: Sign up, sign in, and user profiles
- **Booking System**: Reserve treks with date selection
- **Reviews & Ratings**: User feedback and trek ratings
- **Responsive Search**: Advanced search with filters
- **Admin Dashboard**: Trek and user management for administrators

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **Maps**: Mapbox GL (optional)
- **Payments**: Stripe integration (optional)

## 📁 Project Structure

```
trekking-web/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   └── providers/         # Context providers
├── prisma/                # Database schema
├── lib/                   # Utility functions
├── types/                 # TypeScript types
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trekking-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/trekking_db"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Mapbox (optional)
   MAPBOX_TOKEN="your-mapbox-token-here"
   
   # Stripe (optional)
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

The application uses the following main models:

- **User**: User accounts with roles (USER, GUIDE, ADMIN)
- **Trek**: Trekking adventures with details and images
- **Booking**: User reservations for treks
- **Review**: User feedback and ratings

## 🎨 Customization

### Colors
The website uses a custom color palette defined in `tailwind.config.js`:
- **Primary**: Blue tones for main elements
- **Trek**: Orange tones for trekking theme
- **Nature**: Green tones for natural elements

### Styling
- Custom CSS classes in `globals.css`
- Responsive design with Tailwind breakpoints
- Smooth transitions and hover effects

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🔐 Authentication

- **NextAuth.js** for user management
- **Multiple providers** (credentials, social logins)
- **Protected routes** for user-specific content
- **Role-based access** control

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Static export with `next export`
- **AWS**: Docker container deployment
- **DigitalOcean**: App Platform deployment

## 📈 Performance

- **Image optimization** with Next.js Image component
- **Code splitting** and lazy loading
- **SEO optimization** with metadata
- **Fast loading** with optimized bundles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Features

- **Real-time chat** with guides
- **Mobile app** development
- **AI-powered** trek recommendations
- **Virtual reality** trek previews
- **Social features** for trekkers

---

**Happy Trekking! 🏔️**
