# 🛒 T.Shop - Modern E-Commerce Frontend

A full-featured e-commerce web application built with React, Redux Toolkit, and Tailwind CSS. This project provides a seamless shopping experience with user authentication, cart management, payment processing, and order tracking.

![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.5.0-764ABC?logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite)

## ✨ Features

### 🔐 Authentication & User Management
- **Email/Password Authentication** with JWT tokens
- **Google OAuth Integration** for quick sign-in
- **Protected Routes** with automatic token validation
- **Session Management** with automatic logout on token expiration
- **User Profile** management with editable information

### 🛍️ Shopping Experience
- **Product Catalog** with search and filtering by category
- **Product Details** page with full descriptions
- **Recommended Products** on homepage
- **Guest Cart** - Shop without logging in
- **Cart Synchronization** - Guest cart merges with user cart on login
- **Real-time Cart Updates** with quantity management

### 💳 Payment Processing
- **Stripe Integration** for card payments
- **PayPal Integration** for alternative payment method
- **Secure Checkout** with address validation
- **Payment Intent** creation and confirmation

### 📦 Order Management
- **Order History** with detailed information
- **Order Tracking** with real-time status updates
- **Order Timeline** visualization (Packaging → Shipped → Delivered)
- **Estimated Delivery Dates**

### 🎨 UI/UX Features
- **Responsive Design** - Mobile, tablet, and desktop optimized
- **Modern Interface** with smooth animations
- **Toast Notifications** using SweetAlert2
- **Loading States** and error handling
- **Testimonials Carousel** with auto-slide
- **Floating Labels** for better form UX

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- Backend API running (see backend repository)
- Stripe account for payment processing
- PayPal developer account
- Google OAuth credentials

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/hengthay/ecommerce-app-frontend.git
   cd ecommerce-app-frontend
```

2. **Install dependencies**
```bash
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```env
   # API Configuration
   VITE_API_BASE=http://localhost:3000

   # Stripe Configuration
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

   # PayPal Configuration
   VITE_PP_SANDBOX_CLIENT_ID=your_paypal_client_id_here

   # Google OAuth
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
```

4. **Start the development server**
```bash
   npm run dev
```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure
```
src/
├── app/
│   └── store.js                 # Redux store configuration
├── assets/                      # Static assets (images, icons)
├── components/
│   ├── Carts/                   # Cart-related components
│   ├── Checkout/                # Checkout & payment components
│   ├── ErrorHandle/             # Error message components
│   ├── Helpers/                 # Utility components
│   ├── Orders/                  # Order history & tracking
│   ├── Products/                # Product display components
│   ├── Profile/                 # User profile components
│   ├── Footer.jsx
│   ├── NavBar.jsx
│   ├── Paypal.jsx              # PayPal integration
│   ├── ProtectedRoutes.jsx
│   ├── StripeCheckout.jsx      # Stripe integration
│   └── Testimonial.jsx
├── features/                    # Redux slices
│   ├── auth/
│   │   └── authSlice.js        # Authentication state
│   ├── carts/
│   │   └── cartSlice.js        # Cart management
│   ├── orders/
│   │   └── orderSlice.js       # Order processing
│   ├── products/
│   │   └── productSlice.js     # Product catalog
│   ├── profile/
│   │   └── profileSlice.js     # User profile
│   └── search/
│       └── searchSlice.js      # Search functionality
├── pages/
│   ├── About.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── OrderHistory.jsx
│   ├── ProductDetail.jsx
│   ├── Products.jsx
│   ├── Profile.jsx
│   ├── Register.jsx
│   └── TrackingOrder.jsx
├── utils/
│   ├── axiosInstance.js        # Configured axios instance
│   └── testimonialsData.js     # Mock testimonial data
├── App.jsx                      # Main app component
├── main.jsx                     # App entry point
└── index.css                    # Global styles
```

## 🔧 Key Technologies

### Frontend Core
- **React 18.3.1** - UI library
- **React Router DOM 7.1.1** - Client-side routing
- **Redux Toolkit 2.5.0** - State management
- **Vite 6.0.3** - Build tool

### Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS
- **React Icons** - Icon library

### Payment Processing
- **@stripe/react-stripe-js** - Stripe React components
- **@stripe/stripe-js** - Stripe.js wrapper
- **@paypal/react-paypal-js** - PayPal React SDK

### Authentication
- **jwt-decode** - JWT token decoding
- **Google OAuth** - Google Sign-In

### Utilities
- **Axios 1.7.9** - HTTP client
- **SweetAlert2** - Beautiful alerts
- **jwt-decode** - Token parsing

## 🎯 Available Scripts
```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

```

## 🔒 Security Features

- **JWT Token Management** with automatic expiration
- **Protected Routes** requiring authentication
- **Secure Payment Processing** via Stripe & PayPal
- **Input Validation** on forms
- **XSS Protection** through React's built-in escaping
- **HTTPS Required** in production

## 🛠️ Configuration

### API Integration

The app connects to a backend API. Update the base URL in `.env`:
```env
VITE_API_BASE=https://your-api-domain.com
```

### Payment Providers

1. **Stripe Setup**
   - Get publishable key from [Stripe Dashboard](https://dashboard.stripe.com)
   - Add to `VITE_STRIPE_PUBLISHABLE_KEY`

2. **PayPal Setup**
   - Create app in [PayPal Developer Portal](https://developer.paypal.com)
   - Use sandbox credentials for testing
   - Add client ID to `VITE_PP_SANDBOX_CLIENT_ID`

3. **Google OAuth**
   - Create project in [Google Cloud Console](https://console.cloud.google.com)
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add client ID to `VITE_GOOGLE_CLIENT_ID`

## 📱 Responsive Breakpoints
```css
/* Tailwind default breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

## 🐛 Known Issues & Limitations

- **Browser Storage**: Does not use localStorage for artifact data in claude.ai environment
- **Payment Testing**: Use Stripe test cards and PayPal sandbox for testing
- **Guest Cart**: Limited to localStorage, max 5MB

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Heng Thay**
- GitHub: [@hengthay](https://github.com/hengthay)
- Email: laovkimhengthai@gmail.com

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first approach
- Stripe & PayPal for payment processing
- Anthropic's Claude for development assistance

---

**Made with ❤️ by Heng Thay © 2025**