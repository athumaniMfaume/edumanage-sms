# Use PHP 8.2 with Apache
FROM php:8.2-apache

# 1. Install System Dependencies & PHP Postgres Driver
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo pdo_pgsql

# 2. Correctly Install Node.js 20
RUN curl -fsSL https://deb.nodesource.com | bash - \
    && apt-get install -y nodejs

# 3. Enable Apache mod_rewrite for Laravel
RUN a2enmod rewrite

# 4. Configure Apache to serve /public
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
COPY . .

# 5. Install PHP Dependencies (Composer)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# 6. Build Frontend Assets (Client + SSR)
RUN npm install
RUN npm run build:ssr

# 7. Set Permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Start Command
CMD php artisan migrate --force && apache2-foreground
