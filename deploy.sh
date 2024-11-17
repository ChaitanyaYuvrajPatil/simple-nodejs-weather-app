# Install dependencies
echo "Installing dependencies..."
npm install
# Stop existing PM2 process if running
echo "Stopping existing PM2 process..."
pm2 stop weatherapp
# Start the application with PM2
pm2 start ecosystem.config.js
# Save the PM2 process list
pm2 save
# Setup PM2 to start on system boot
pm2 startup

