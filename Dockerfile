# Step 1: Build React Assets
FROM node:20 AS node_builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Step 2: PHP Environment
FROM php:8.2-apache
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_pgsql

# Configure Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

WORKDIR /var/www/html
COPY . .
COPY --from=node_builder /app/public/build ./public/build

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Start script
CMD php artisan migrate --force && apache2-foreground