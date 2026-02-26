# School Management System (EduManage SMS)

**Live Demo:** [https://edumanage-sms.onrender.com](https://edumanage-sms.onrender.com)

EduManage SMS is a monolithic Laravel 12 application with React integration, designed to manage multiple schools efficiently. This system helps administrators manage students, courses, teachers, enrollments, and school-related data in a centralized and user-friendly interface.

## 1. Description
EduManage SMS is a multi-school management system that simplifies administrative tasks across multiple institutions. The system supports both admin and user roles, automates student and course management, and provides real-time updates for school operations.

## 2. Objectives
*   Centralize school management for multiple institutions.
*   Streamline student, teacher, and course management.
*   Track student enrollment and academic progress.
*   Provide role-based access for admins and school staff.
*   Improve operational efficiency and transparency.

## 3. System Features
### 3.1 Functional Requirements
✅ Student registration & management  
✅ Teacher management & course assignment  
✅ Enrollment tracking  
✅ Role-based access (Admin, Staff)  
✅ Reporting and analytics dashboard  
✅ Notifications for important updates

### 3.2 Non-Functional Requirements
✅ Security (Authentication & Data Protection)  
✅ Scalability (Supports multiple schools)  
✅ Performance (Optimized queries & caching)  
✅ Usability (Responsive UI with React & Tailwind 4)  
✅ Reliability (Data integrity & uptime)

## 4. System Architecture
### 4.1 Technology Stack
*   **Frontend:** React (Inertia.js), Tailwind CSS 4, TypeScript
*   **Backend:** Laravel 12 (PHP Framework)
*   **Database:** PostgreSQL (Production on Neon), MySQL (Local)
*   **Containerization:** Docker
*   **Deployment:** [Render](https://render.com)

### 4.2 System Design
*   **User Authentication:** Laravel Fortify / Starter Kits
*   **Database Relationships:** Students, Teachers, Courses, Enrollments, Users

## 5. Database Schema

| Table Name | Description |
| :--- | :--- |
| `students` | Stores student information |
| `teachers` | Stores teacher details |
| `courses` | Manages course information |
| `enrollments` | Tracks student enrollments |
| `users` | Stores admin/staff credentials |

## 6. User Roles & Permissions
### Admin
*   Full system access.
*   Manage students, teachers, courses, and enrollments.
*   View reports and analytics.

### Staff
*   Manage students and courses assigned to their school.
*   Track enrollments.
*   Update student records.

## 7. Installation Guide
### 7.1 Prerequisites
*   PHP 8.2+
*   Composer & Node.js 20+
*   Docker (Optional for local dev)
*   MySQL (Local) / PostgreSQL (Production)

### 7.2 Steps to Install
1.  **Clone repository**
    ```bash
    git clone https://github.com/athumaniMfaume/edumanage-sms.git
    cd edumanage-sms
    ```
2.  **Install dependencies**
    ```bash
    composer install
    npm install
    ```
3.  **Copy environment file**
    ```bash
    cp .env.example .env
    ```
4.  **Generate application key**
    ```bash
    php artisan key:generate
    ```
5.  **Run migrations**
    ```bash
    php artisan migrate --seed
    ```
6.  **Start the application**
    ```bash
    php artisan serve
    npm run dev
    ```

## 8. Default Login Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | athumanimfaume1995@gmail.com | `12345678` |
| **User** | athumanimfaume1995@gmail.com | `12345678` |

## 9. Conclusion
EduManage SMS provides a centralized, secure, and user-friendly platform for managing multiple schools. It enhances operational efficiency, ensures data integrity, and simplifies administrative workflows for both admins and staff.
