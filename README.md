# Ubuntu Deployment Guide

## Step-by-Step Deployment Instructions

This guide walks you through deploying the Cybersecurity Professional Portfolio on an Ubuntu server.

## Prerequisites

- Ubuntu 20.04 or later
- Root or sudo access
- Domain name (optional but recommended)

## Step 1: Update System

```bash
sudo apt update && sudo apt upgrade -y
```

## Step 2: Install Node.js

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

## Step 3: Install PostgreSQL

```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql
```

In PostgreSQL shell:
```sql
CREATE DATABASE portfolio_db;
CREATE USER portfolio_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO portfolio_user;
\q
```

## Step 4: Install PM2 Process Manager

```bash
sudo npm install -g pm2
```

## Step 5: Clone and Setup Application

```bash
# Clone your repository
git clone <your-repository-url>
cd <your-project-directory>

# Install dependencies
npm install

# Build the application
npm run build
```

## Step 6: Environment Configuration

Create a `.env` file in your project root:

```bash
nano .env
```

Add the following content:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://portfolio_user:your_secure_password@localhost:5432/portfolio_db
```

## Step 7: Database Migration

```bash
# Run database migrations
npm run db:push
```

## Step 8: Start Application with PM2

```bash
# Start the application
pm2 start npm --name "portfolio" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
```

## Step 9: Install and Configure Nginx

```bash
# Install Nginx
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

Create Nginx configuration:
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add the following configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## Step 10: Configure Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Step 11: SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Step 12: Monitor and Manage

```bash
# Check application status
pm2 status

# View logs
pm2 logs portfolio

# Restart application
pm2 restart portfolio

# Stop application
pm2 stop portfolio

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Updating the Application

```bash
# Navigate to project directory
cd /path/to/your/project

# Pull latest changes
git pull origin main

# Install any new dependencies
npm install

# Rebuild application
npm run build

# Restart PM2 process
pm2 restart portfolio
```

## Troubleshooting

### Application won't start
- Check logs: `pm2 logs portfolio`
- Verify environment variables in `.env`
- Ensure database is running: `sudo systemctl status postgresql`

### Database connection issues
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify database credentials in `.env`
- Test database connection: `psql -h localhost -U portfolio_user -d portfolio_db`

### Nginx issues
- Check configuration: `sudo nginx -t`
- View error logs: `sudo tail -f /var/log/nginx/error.log`
- Restart Nginx: `sudo systemctl restart nginx`

## Security Considerations

1. **Regular Updates**: Keep system and packages updated
2. **Database Security**: Use strong passwords and consider restricting database access
3. **Firewall**: Only allow necessary ports
4. **SSL**: Always use HTTPS in production
5. **Backup**: Regular database and application backups

## Backup Strategy

```bash
# Database backup
pg_dump -h localhost -U portfolio_user portfolio_db > backup_$(date +%Y%m%d).sql

# Application backup
tar -czf app_backup_$(date +%Y%m%d).tar.gz /path/to/your/project
```

## Performance Optimization

1. **Enable Gzip in Nginx**:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

2. **Set up log rotation**:
```bash
sudo nano /etc/logrotate.d/portfolio
```

3. **Monitor resource usage**:
```bash
# Install htop for monitoring
sudo apt install htop -y
```

Your cybersecurity portfolio should now be successfully deployed and accessible via your domain!
