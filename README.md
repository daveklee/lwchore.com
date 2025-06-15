# LWChore - Fun Allowance Calculator

A gamified allowance calculator that lets kids rate their chore performance and spin a wheel to determine their bonus multiplier!

## Features

- 🎯 **Chore Performance Rating**: Grade your chore performance from F to S
- 🎰 **Spinning Wheel**: Interactive wheel with different bonus levels
- 🎮 **Auto Bonus Mode**: Roblox-inspired rarity system that adjusts based on performance
- 💾 **Custom Presets**: Save and load your own bonus configurations
- 📱 **Responsive Design**: Works great on mobile and desktop
- 💰 **Robux Integration**: Convert allowance to Robux with purchase links

## Environment Variables

### Google Analytics (Optional)

To enable Google Analytics tracking, set the following environment variable in your Netlify dashboard:

- `VITE_GA_TRACKING_ID` - Your Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`)

#### Setting up Google Analytics in Netlify:

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Set the key as `VITE_GA_TRACKING_ID`
5. Set the value as your Google Analytics Measurement ID
6. Click **Save**
7. Redeploy your site for the changes to take effect

#### Getting your Google Analytics Measurement ID:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or select an existing one
3. Go to **Admin** → **Data Streams**
4. Select your web stream
5. Copy the **Measurement ID** (starts with `G-`)

## Analytics Events Tracked

When Google Analytics is configured, the app tracks:

- **Allowance Calculations**: Base amount, final amount, bonus type, and mode used
- **Chore Grade Changes**: When users adjust their performance rating
- **Mode Toggles**: Switching between Auto Bonus and Custom modes
- **Preset Actions**: Saving, loading, and deleting custom presets

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This app is configured for easy deployment on Netlify with:

- Automatic SPA routing
- Security headers
- Asset caching
- Environment variable support

Simply connect your repository to Netlify and it will deploy automatically!