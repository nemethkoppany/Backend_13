FROM php:8.2-apache

# PDO MySQL kiterjesztés telepítése
RUN docker-php-ext-install pdo pdo_mysql

# mod_rewrite engedélyezése (URL routing)
RUN a2enmod rewrite

# .htaccess engedélyezése
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Alkalmazás másolása a webroot alá
COPY . /var/www/html/

EXPOSE 80
