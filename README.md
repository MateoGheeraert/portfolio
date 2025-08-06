# Mateo Gheeraert - Portfolio Website

A modern, multilingual portfolio website built with Next.js, featuring a full-stack architecture with blog and project management capabilities. This portfolio showcases my work as a Full-Stack Developer with an integrated admin system for content management.

## 🌟 Features

### Core Features

- **Multilingual Support**: Full internationalization (i18n) with English, Dutch, and French translations
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching with persistent preferences
- **Server-Side Rendering**: Optimized performance with Next.js App Router
- **SEO Optimized**: Meta tags, structured data, and performance optimization

### Content Management

- **Admin Dashboard**: Secure authentication system for content management
- **Project Management**: Full CRUD operations for portfolio projects
- **Blog System**: Create, edit, and manage blog posts with markdown support
- **Media Management**: Image upload and optimization
- **Multi-language Content**: Manage content in three languages (EN/NL/FR)

### Technical Features

- **Database Integration**: Supabase PostgreSQL with real-time capabilities
- **Authentication**: Secure admin authentication with session management
- **Form Validation**: Zod schema validation with React Hook Form
- **Email Integration**: Contact form with Resend email service
- **Analytics**: Google Analytics integration
- **Type Safety**: Full TypeScript implementation

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **UI Components**: Radix UI + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React + Phosphor Icons

### Backend & Database

- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **API Routes**: Next.js API routes
- **Email Service**: Resend

### Development Tools

- **Package Manager**: npm
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier (implied by clean code structure)
- **Build Tool**: Next.js built-in bundler
- **Development**: Hot reload, TypeScript checking

## 📁 Project Structure

```
portfolio/
├── public/                          # Static assets
│   ├── images/                     # Image assets
│   ├── logos/                      # Technology logos
│   └── language/                   # Language-specific assets
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── (admin)/               # Admin routes group
│   │   │   └── admin/
│   │   │       ├── login/         # Authentication
│   │   │       ├── register/      # User registration
│   │   │       ├── dashboard/     # Admin dashboard
│   │   │       ├── blog/         # Blog management
│   │   │       └── projects/     # Project management
│   │   ├── (visitor)/            # Public routes group
│   │   │   └── [locale]/         # Internationalized routes
│   │   │       ├── about/        # About page
│   │   │       ├── blog/         # Blog listing & posts
│   │   │       ├── contact/      # Contact form
│   │   │       └── projects/     # Project showcase
│   │   ├── api/                  # API routes
│   │   └── globals.css           # Global styles
│   ├── components/               # Reusable components
│   │   ├── admin/               # Admin-specific components
│   │   ├── ui/                  # shadcn/ui components
│   │   └── providers/           # Context providers
│   ├── dal/                     # Data Access Layer
│   │   ├── db.ts               # Database configuration
│   │   ├── blog.ts             # Blog operations
│   │   └── projects.ts         # Project operations
│   ├── i18n/                   # Internationalization
│   │   ├── config.ts           # i18n configuration
│   │   └── dictionaries/       # Translation files
│   ├── lib/                    # Utility libraries
│   └── utils/                  # Helper functions
├── sql/                        # Database schema
├── docker-compose.yaml         # Local development setup
├── components.json             # shadcn/ui configuration
├── tailwind.config.js         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- Docker and Docker Compose (for local database)
- Supabase account (for production database)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/MateoGheeraert/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # Email Service (Resend)
   RESEND_API_KEY=your_resend_api_key

   # Google Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
   ```

4. **Set up local database (Optional)**

   ```bash

   ```

   This starts a PostgreSQL database on port 5432 and Adminer on port 8080.

5. **Run database migrations**
   Execute the SQL scripts in the `sql/` folder to create the required tables:

   ```sql
   -- Run the contents of sql/create_blog_table.sql
   -- And any other schema files
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

#### Using Supabase (Recommended for Production)

1. Create a new Supabase project
2. Copy your project URL and anon key to `.env.local`
3. Run the SQL scripts from the `sql/` folder in the Supabase SQL editor
4. Set up Row Level Security (RLS) policies as needed

### Admin Setup

1. **Create an admin user** (Development only)

   ```bash
   # Call the API endpoint to create a test admin
   curl -X POST http://localhost:3000/api/create-test-admin
   ```

   This creates a test admin with:
   - Email: `admin@example.com`
   - Password: `admin123`

2. **Access the admin panel**
   Navigate to `/admin` and log in with your credentials.

## 🌐 Internationalization

The portfolio supports three languages:

- **English** (`en`) - Default
- **Dutch** (`nl`)
- **French** (`fr`)

### How it works:

- **Route Structure**: `/[locale]/page` (e.g., `/en/about`, `/nl/over-mij`, `/fr/a-propos`)
- **Middleware**: Automatically redirects to default locale if none specified
- **Content Management**: Each blog post and project has content in all three languages
- **Translation Files**: Located in `src/i18n/dictionaries/`

### Adding Translations:

1. Update the dictionary files in `src/i18n/dictionaries/`
2. Ensure all content types (projects, blog posts) have translations
3. The system automatically serves the correct language based on the route

## 💼 Admin System

### Authentication

- Secure login/logout system using Supabase Auth
- Protected routes with middleware-based authentication
- Session management with cookie-based persistence

### Content Management

#### Projects

- Create, read, update, delete projects
- Multi-language support (title, content for each language)
- Technology stack management
- Image URL storage
- GitHub and demo URL links
- Automatic date tracking

#### Blog Posts

- Full CRUD operations for blog posts
- Markdown content support with live preview
- Tag system for categorization
- Read time estimation
- Multi-language content management
- Image integration

#### Dashboard Features

- Overview of all content
- Quick access to management functions
- Clean, responsive admin interface
- Real-time data updates with TanStack Query

## 🎨 Styling & Design

### Design System

- **Primary Colors**: Blue color palette with dark mode support
- **Typography**: System fonts with Geist font optimization
- **Components**: Built with shadcn/ui component library
- **Layout**: Mobile-first responsive design
- **Animations**: Subtle animations with Tailwind CSS

### Theme System

- Light and dark mode support
- CSS custom properties for theme switching
- Persistent theme preferences
- Smooth transitions between themes

### Custom Components

- `TypewriterEffect`: Animated typing effect for hero section
- `ImageTooltip`: Interactive tooltip for profile images
- `ProjectCard`: Showcase component for projects
- `BlogPostCard`: Preview cards for blog posts
- `TechCard`: Technology skill display
- `MarkdownEditor`: Rich markdown editing experience

## 📧 Contact Form

Integrated contact system with:

- **Form Validation**: Zod schema validation
- **Email Service**: Resend API for reliable email delivery
- **Multi-language**: Translated form labels and validation messages
- **User Feedback**: Success/error states with clear messaging

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Organization

- **Server Actions**: Used for database operations
- **Client Components**: Interactive UI components
- **Type Safety**: Full TypeScript implementation
- **Error Boundaries**: Proper error handling throughout the app
- **Loading States**: Loading indicators for better UX

### Database Schema

#### Projects Table

```sql
id: UUID (Primary Key)
title_dutch: TEXT
title_english: TEXT
title_french: TEXT
content_dutch: TEXT
content_english: TEXT
content_french: TEXT
techstack: TEXT[] (Array)
image_url: TEXT (Optional)
github_url: TEXT (Optional)
demo_url: TEXT (Optional)
created_at: TIMESTAMPTZ
```

#### Blog Table

```sql
id: UUID (Primary Key)
title_dutch: TEXT
title_english: TEXT
title_french: TEXT
content_dutch: TEXT
content_english: TEXT
content_french: TEXT
image_url: TEXT (Optional)
tags: TEXT[] (Array)
read_time: INTEGER (Optional)
created_at: TIMESTAMPTZ
```

## 🚀 Deployment

### Environment Setup

Ensure all environment variables are configured:

- Supabase credentials
- Email service API keys
- Analytics tracking IDs

### Build Process

```bash
npm run build
npm run start
```

### Docker Deployment

The project includes Docker configuration for containerized deployment.

## 📈 Performance

### Optimizations Implemented

- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic with Next.js App Router
- **Server-Side Rendering**: For better SEO and performance
- **Database Optimization**: Proper indexing and query optimization
- **Caching**: Browser caching for static assets

### Analytics

- Google Analytics integration for visitor tracking
- Performance monitoring capabilities

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is personal portfolio code. Feel free to use it as inspiration for your own portfolio, but please don't copy it directly.

## 👨‍💻 About the Developer

**Mateo Gheeraert** - Full-Stack Developer

- 🎓 Bachelor in Applied Computer Sciences (VIVES University of Applied Sciences, Kortrijk)
- 💼 Experience with React, Next.js, Node.js, Java, C#, Kotlin, Swift, and more
- 🌱 Always learning new technologies and best practices
- 📍 Based in Merkem, Belgium

## 📞 Contact

- **Email**: mateogheeraert04@gmail.com
- **Portfolio**: [Live Demo](your-portfolio-url)
- **LinkedIn**: [Your LinkedIn Profile](your-linkedin-url)
- **GitHub**: [MateoGheeraert](https://github.com/MateoGheeraert)

---

_Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Supabase_
