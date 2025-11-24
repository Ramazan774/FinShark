📈 FinShark
A full-stack stock portfolio management application that allows users to search for stocks, build their portfolio, and analyze financial statements. Powered by real-time financial data from Financial Modeling Prep API.
✨ Features

Stock Search: Search for stocks by symbol or company name
Portfolio Management: Add and remove stocks from your personal portfolio
Financial Analysis: View detailed financial statements

Balance Sheet
Income Statement
Cash Flow Statement

SEC Filings: Access 10-K reports for in-depth company analysis
Comments: Write and share comments on stocks
User Authentication: Secure JWT-based authentication system

🛠️ Tech Stack
Frontend

React - UI library for building interactive interfaces
TypeScript - Type-safe JavaScript
Tailwind CSS - Utility-first CSS framework
Axios - HTTP client for API requests

Backend

.NET 8/9 - Cross-platform framework for building APIs
Entity Framework Core - ORM for database operations
PostgreSQL - Relational database
ASP.NET Core Identity - Authentication and authorization
JWT Bearer Authentication - Token-based security

External APIs

Financial Modeling Prep API - Real-time stock and financial data

🚀 Getting Started
Prerequisites

.NET 8 SDK or higher
Node.js (v16 or higher)
PostgreSQL database
Financial Modeling Prep API key (Get one here)

Installation

Clone the repository

bashgit clone https://github.com/ramazan774/finshark.git
cd finshark

Set up the backend

bashcd api

# Create appsettings.Development.json
cat > appsettings.Development.json << EOF
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=finshark;Username=postgres;Password=your_password;Port=5432"
  },
  "JWT": {
    "Issuer": "http://localhost:5278",
    "Audience": "http://localhost:5278",
    "SigningKey": "your_secure_signing_key_at_least_32_characters_long"
  },
  "FMPKey": "your_fmp_api_key"
}
EOF

# Install dependencies and run migrations
dotnet restore
dotnet ef database update

# Start the API
dotnet run

Set up the frontend

bashcd frontend

# Install dependencies
npm install

# Create .env.local
echo "REACT_APP_API_URL=http://localhost:5278" > .env.local

# Start the development server
npm start

Open http://localhost:3000 to view the application

🔒 Environment Variables
Backend (appsettings.Development.json)
json{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=finshark;Username=postgres;Password=your_password"
  },
  "JWT": {
    "Issuer": "your_issuer",
    "Audience": "your_audience",
    "SigningKey": "your_signing_key"
  },
  "FMPKey": "your_fmp_api_key"
}
Frontend (.env.local)
REACT_APP_API_URL=http://localhost:5278
📊 Database Schema

Users: User accounts and authentication
Stocks: Stock information from FMP API
Portfolios: User stock portfolios (many-to-many relationship)
Comments: User comments on stocks

🌐 Deployment
Backend Deployment (Render)

Create a PostgreSQL database on Render
Create a Web Service for your .NET API
Add environment variables:

DATABASE_URL
FMPKey
JWT__Issuer
JWT__Audience
JWT__SigningKey



Frontend Deployment (Netlify/Vercel)

Build the React app: npm run build
Deploy the build folder
Set environment variable: REACT_APP_API_URL=https://your-api.onrender.com

📚 API Endpoints
Authentication

POST /api/account/register - Register new user
POST /api/account/login - User login

Stocks

GET /api/stock/search?query={symbol} - Search stocks
GET /api/stock/profile/{symbol} - Get stock profile
GET /api/stock/key-metrics/{symbol} - Get key metrics
GET /api/stock/income-statement/{symbol} - Get income statement
GET /api/stock/balance-sheet-statement/{symbol} - Get balance sheet
GET /api/stock/cash-flow-statement/{symbol} - Get cash flow
GET /api/stock/ten-k/{symbol} - Get 10-K filing

Portfolio

GET /api/portfolio - Get user's portfolio
POST /api/portfolio - Add stock to portfolio
DELETE /api/portfolio/{symbol} - Remove stock from portfolio

Comments

GET /api/comment/{symbol} - Get comments for a stock
POST /api/comment - Add a comment
DELETE /api/comment/{id} - Delete a comment
