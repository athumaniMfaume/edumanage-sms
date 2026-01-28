School Management System (EduManage SMS)

EduManage SMS is a monolithic Laravel 12 application with React integration, designed to manage multiple schools efficiently. This system helps administrators manage students, courses, teachers, enrollments, and school-related data in a centralized and user-friendly interface.

1. Description

EduManage SMS is a multi-school management system that simplifies administrative tasks across multiple institutions. The system supports both admin and user roles, automates student and course management, and provides real-time updates for school operations.

2. Objectives

Centralize school management for multiple institutions

Streamline student, teacher, and course management

Track student enrollment and academic progress

Provide role-based access for admins and school staff

Improve operational efficiency and transparency

3. System Features
3.1 Functional Requirements

✅ Student registration and management
✅ Teacher management and course assignment
✅ Enrollment tracking
✅ Role-based access (Admin, Staff)
✅ Reporting and analytics dashboard
✅ Notifications for important updates

3.2 Non-Functional Requirements

✅ Security (authentication & data protection)
✅ Scalability (supports multiple schools)
✅ Performance (optimized queries & caching)
✅ Usability (responsive UI with React & Blade)
✅ Reliability (data integrity & uptime)

4. System Architecture
4.1 Technology Stack

Frontend: React, Blade Templates, HTML, CSS, JavaScript (Bootstrap)

Backend: Laravel 12 (PHP Framework)

Database: MySQL

Version Control: GitHub

Deployment: AWS / DigitalOcean / Local Server

4.2 System Design

User Authentication: Laravel built-in authentication

Database Relationships: Students, Teachers, Courses, Enrollments, Users

5. Database Schema
Table Name	Description
students	Stores student information
teachers	Stores teacher details
courses	Manages course information
enrollments	Tracks student enrollments
users	Stores admin/staff credentials
6. User Roles & Permissions
Admin

Full system access

Manage students, teachers, courses, and enrollments

View reports and analytics

Staff

Manage students and courses assigned to their school

Track enrollments

Update student records

7. Installation Guide
7.1 Prerequisites

PHP 8.x

Composer

MySQL Database

Laravel 12

Web server (Apache/Nginx)

7.2 Steps to Install
# Clone repository
git clone https://github.com/athumaniMfaume/edumanage-sms.git
cd edumanage-sms

# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations and seeders
php artisan migrate --seed

# Start the application
php artisan serve

8. Default Login Credentials
Role	Email	Password
Admin	athumanimfaume1995@gmail.com
	12345678
User	athumanimfaume1995@gmail.com
	12345678
9. Usage Guide

Admin Dashboard: Manage students, teachers, courses, and enrollments.

User Dashboard: View assigned courses, manage students, track enrollments.

10. Backup and Recovery

Daily database backups via Laravel Scheduler

Backups can be stored in cloud storage (AWS S3, Google Drive, etc.)

Restoration through admin panel

11. Conclusion

EduManage SMS provides a centralized, secure, and user-friendly platform for managing multiple schools. It enhances operational efficiency, ensures data integrity, and simplifies administrative workflows for both admins and staff.
