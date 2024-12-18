<h1 align="center">🍕 Next Pizza</h1>

### Demo

You can view the demo version of the application using the following link:

[🌐 Demo Application](next-pizza-chi.vercel.app)

## Description

A single-page application inspired by the Dodo Pizza website, built with Next.js. The app allows users to browse and order pizzas and other dishes. Users can customize their pizzas by choosing ingredients and changing sizes. The app features email, Google, and GitHub authentication, a test payment option powered by YooKassa, and automated email notifications for order updates.

## Usage Instructions

- **Ordering a Pizza**:
  - Browse the menu to select your desired pizza or dish.
  - Customize your pizza by choosing ingredients if applicable.
  - Add the selected items to your cart.
- **Authentication**:
  - Sign in using your email, Google, or GitHub account.
  - Follow the prompts to complete the authentication process.
- **Payment**:
  - Proceed to checkout and make a test payment via YooKassa.
  - Follow the steps to confirm your order.
- **Order Notifications**:
  - After placing your order, you will receive a confirmation email with order details.
  - Updates on the order status will also be sent via email.

## Technologies

- **next** - A powerful framework for building server-side rendered and static applications with React.  
- **tailwindcss** - A utility-first CSS framework for designing modern and responsive user interfaces.  
- **typescript** - A strongly-typed programming language that builds on JavaScript, enhancing developer productivity.  
- **prisma** - A next-generation ORM for database access with TypeScript and JavaScript.  
- **zustand** - A lightweight state management library for React applications.  
- **react-hook-form** - A library for building flexible and performant forms in React.  
- **next-auth** - A library for adding authentication to Next.js applications, supporting multiple providers.  
- **zod** - A TypeScript-first schema validation library for validating and parsing data. 

## Installation and Running the Application

1. Clon the repository:
```bash
git clone https://github.com/roman-pixel/ton-test-task.git
```

2. Navigate to the project directory.
3. Install dependencies using yarn or npm:
```bash
 npm install
```

4. Create **.env** file in the root directory and fill it with the following data:
```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=

NEXT_PUBLIC_DADATA_API_KEY=

RESEND_API_KEY=

YOOKASSA_STORE_ID=
YOOKASSA_API_KEY=
YOOKASSA_CALLBACK_URL=

NEXTAUTH_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_API_URL=/api
```

Description of Variables:

- **POSTGRES_URL**: The connection string for your PostgreSQL database.  
- **POSTGRES_PRISMA_URL**: The connection string specifically used by Prisma for database operations.  
- **NEXT_PUBLIC_DADATA_API_KEY**: API key for the Dadata service, used for address suggestions and validation.  
- **RESEND_API_KEY**: API key for the Resend service, used for sending transactional emails.  
- **YOOKASSA_STORE_ID**: Store ID for YooKassa, required for payment processing.  
- **YOOKASSA_API_KEY**: API key for YooKassa, used for authenticating requests.  
- **YOOKASSA_CALLBACK_URL**: Callback URL for receiving payment updates from YooKassa.  
- **NEXTAUTH_SECRET**: Secret key used by NextAuth for token encryption.  
- **GITHUB_CLIENT_ID**: GitHub application Client ID for authentication.  
- **GITHUB_CLIENT_SECRET**: GitHub application Client Secret for authentication.  
- **GOOGLE_CLIENT_ID**: Google application Client ID for authentication.  
- **GOOGLE_CLIENT_SECRET**: Google application Client Secret for authentication.  
- **NEXT_PUBLIC_API_URL**: Public API endpoint, typically `/api`.  

5. Start the application:
```bash
 npm run dev
```
