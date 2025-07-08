# Cybersecurity Professional Portfolio

## Overview

This is a full-stack web application built as a professional portfolio for a cybersecurity expert. The application showcases experience, skills, and provides interactive features including a real-time HTTP headers display tool. The project uses a modern tech stack with React frontend, Express backend, and PostgreSQL database integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom cybersecurity-themed design system
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Structure**: RESTful endpoints with middleware for logging and error handling
- **Session Management**: PostgreSQL session store with connect-pg-simple

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon
- **ORM**: Drizzle ORM with Zod schema validation
- **Migration Management**: Drizzle Kit for database migrations
- **In-Memory Storage**: MemStorage class for development/testing scenarios

## Key Components

### Frontend Components
1. **Navigation System**: Fixed navigation with smooth scrolling and mobile-responsive design
2. **Portfolio Sections**: Home, Experience, Skills, and Contact sections
3. **Interactive Elements**: Company carousel, skills display, and responsive design
4. **Headers Tool**: Real-time HTTP headers display with auto-refresh functionality
5. **UI Components**: Comprehensive set of accessible components from Radix UI

### Backend Components
1. **Express Server**: Main application server with middleware stack
2. **Route Handlers**: API endpoints for headers display and potential user management
3. **Database Integration**: Drizzle ORM with PostgreSQL connection
4. **Storage Layer**: Abstract storage interface with both database and in-memory implementations
5. **Development Tools**: Vite integration for hot module replacement in development

## Data Flow

### Client-Server Communication
1. **Frontend**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle HTTP requests with proper error handling
3. **Database Layer**: Drizzle ORM manages database operations with type safety
4. **Response Flow**: JSON responses with consistent error handling and logging

### Real-time Features
1. **Headers Endpoint**: `/api/headers` provides real-time HTTP header information
2. **Auto-refresh**: Frontend polls the headers endpoint every 5 seconds
3. **Error Handling**: Graceful error states with user-friendly messages

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with custom theme configuration
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React for consistent iconography

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **Type Checking**: TypeScript with strict configuration
- **Code Quality**: ESLint and Prettier (implied by project structure)

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds the React application to `dist/public`
2. **Backend Build**: esbuild bundles the Express server to `dist/index.js`
3. **Database**: Drizzle Kit manages schema migrations

### Environment Configuration
- **Development**: `npm run dev` starts both frontend and backend with HMR
- **Production**: `npm run build` creates optimized builds for deployment
- **Database**: Environment variable `DATABASE_URL` required for PostgreSQL connection

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build process
- `start`: Production server startup
- `db:push`: Database schema deployment

## Changelog

Changelog:
- July 03, 2025. Initial setup
- July 03, 2025. Enhanced Headers page with device information and response headers display using tabbed interface
- July 03, 2025. Integrated Cloudflare Turnstile for Headers page security verification
- July 03, 2025. Removed Headers from main navigation, added discrete link in footer
- July 03, 2025. Removed Technical Protocols section, updated skills to 3-column layout with center alignment
- July 03, 2025. Created comprehensive deployment guide and project export instructions

## User Preferences

Preferred communication style: Simple, everyday language.