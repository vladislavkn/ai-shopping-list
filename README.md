# AI Meal Planner

An intelligent meal planning application that helps users create weekly menus and shopping lists based on available products in their supermarket.

## Features

- AI-powered meal planning: Generate weekly meal plans based on your available products
- Responsive design: Works on both mobile and desktop devices

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   - Create a `.env.local` file in the root directory
   - Add the following variables:
     ```
     OPENAI_API_KEY=your_openai_api_key
     NEXT_PUBLIC_APP_URL=http://localhost:3000
     ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- OpenAI API
- MobX for state management
