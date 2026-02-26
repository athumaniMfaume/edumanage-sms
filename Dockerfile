# Step 1: Get Node binary from official image
FROM node:20-slim AS node_source

# Step 2: Main PHP Environment
FROM php:8.2-apache

# Install System Dependencies & PHP Postgres Driver
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql

# COPY Node.js from the first stage (The Fix)
COPY --from=node_source /usr/local/bin/node /usr/local/bin/node
COPY --from=node_source /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/bin/node /usr/local/bin/nodejs && ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# Configure Apache to serve /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
COPY . .

# Install PHP Dependencies (Composer)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Build Frontend Assets (Client + SSR)
# Wayfinder will now find the 'php' binary here!
RUN npm install
RUN npm run build:ssr

# Set Permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Start Command
CMD php artisan migrate --force && apache2-foreground
