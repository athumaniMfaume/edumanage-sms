# Use PHP 8.2 with Apache
FROM php:8.2-apache

# Set non-interactive mode for apt
ENV DEBIAN_FRONTEND=noninteractive

# 1. Install System Dependencies & PHP Postgres Driver
RUN apt-get update && apt-get install -y \
    libpq-dev \
    zip \
    unzip \
    git \
    curl \
    gnupg \
    && docker-php-ext-install pdo pdo_pgsql

# 2. Correctly Install Node.js 20 using the new NodeSource method
RUN mkdir -p /etc/apt/keyrings \
    && curl -fsSL https://deb.nodesource.com | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg \
    && echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com nodistro main" | tee /etc/apt/sources.list.d/nodesource.list \
    && apt-get update && apt-get install -y nodejs

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