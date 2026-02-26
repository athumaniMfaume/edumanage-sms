# Step 1: Build React/TypeScript Assets
FROM node:20 AS node_builder
WORKDIR /app

# Copy package files for caching
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# CRITICAL: Wayfinder and Vite require these directories to exist
RUN mkdir -p public/build bootstrap/ssr

# Run the build (uses your "build" script from package.json)
# If you use SSR, change this to: RUN npm run build:ssr
RUN npm run build

# Step 2: PHP Environment (Production)
FROM php:8.2-apache

# Install PostgreSQL drivers for Neon
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql

# Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# Configure Apache to serve the 'public' folder
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
COPY . .

# Copy built assets from the Node stage
COPY --from=node_builder /app/public/build ./public/build
# Uncomment the line below if you actually use SSR
# COPY --from=node_builder /app/bootstrap/ssr ./bootstrap/ssr

# Install PHP dependencies (Composer)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Set correct permissions for Laravel
RUN chown -R www-data:www-data storage bootstrap/cache

# Start Command: Migrate the Neon DB and start Apache
CMD php artisan migrate --force && apache2-foreground