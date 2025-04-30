# 📱 React Native + SQLite Student Management App (Full Series)

Welcome to the complete **Student Management App Tutorial Series** built with **React Native** and **SQLite**.  
This series walks you through building a real-world, offline-first mobile app covering all major features from scratch — perfect for learning, portfolios, or freelance projects.

---

## 🚀 What You'll Build

A full-featured mobile app where students can:
- 📋 Register themselves
- 🎓 Choose a course (with predefined subjects & fees)
- 📚 Get subjects assigned automatically based on the course
- 🗓️ Mark their daily attendance
- 📊 View monthly attendance reports
- 📝 Check exam marks entered by admin/teacher
- 💰 Track and manage their course fee status
- 🧠 View performance reports

And **Admin/Teacher Panel** can:
- 🎓 Add/Edit Courses (name + fee)
- 📚 Assign subjects per course
- 🧑‍🏫 Enter marks for students (subject-wise & exam-wise)
- 📅 View and filter attendance logs
- 💵 Track fee payments by student
- 🔍 Filter and search students

---

## 🏫 Course & Subject Management

- Admin defines available **Courses** (e.g., BCA, BBA, MBA, etc.)
- Each Course has:
  - Name
  - Fee (e.g., ₹35,000)
  - List of assigned **Subjects** (e.g., "Math", "DBMS", etc.)

- When a student registers and selects a course:
  - Subjects are automatically assigned to them
  - Course fee is linked for future payment tracking

---

## 📚 Series Breakdown (Episode-wise)

### 🔹 Episode 1 – Project Setup & Student Registration
- React Native + SQLite setup
- File and folder structure
- Create tables for students, courses, and subjects
- Student registration form with course selection

### 🔹 Episode 2 – Course, Subject & Fee Setup
- Admin creates courses with fees
- Admin assigns subjects to courses
- Relational database setup (Course ↔ Subjects)

### 🔹 Episode 3 – Attendance System
- Daily attendance marking
- Attendance table design
- Prevent duplicate entries per day

### 🔹 Episode 4 – Monthly Attendance Report
- Month-wise filter
- Attendance percentage calculation
- Visual UI for present/absent summary

### 🔹 Episode 5 – Exams & Marks Module
- Add exams (Midterm, Final, etc.) linked to course & subject
- Enter student marks for each subject & exam
- Student can view results grouped by subject and exam

### 🔹 Episode 6 – Fees Management
- Each course has a predefined fee
- Admin can mark a student’s fee status (Paid/Unpaid)
- Student can view their fee status

### 🔹 Episode 7 – Admin Panel & Filters
- Admin Dashboard:
  - Add/edit/delete students
  - Enter exam marks
  - View attendance logs
  - Track fee payment status
  - Filter by course, attendance, or fee
  - Add/edit courses and assign subjects

### 🔹 Episode 8 – Performance Reports
- Show combined performance:
  - Attendance %
  - Marks average
  - Fee payment status
- Export/share performance data (optional)

---

## 🧠 Technical Concepts You'll Learn

- Full CRUD using SQLite (`INSERT`, `SELECT`, `UPDATE`, `DELETE`)
- Relational table design with JOINs (Students ↔ Courses ↔ Subjects ↔ Exams)
- Attendance tracking and validation
- Course–subject assignment logic
- Modular file/folder structure
- React Native Context API for state management
- Date filters, form validation, reusable components

---

## 🔧 Tools & Packages Used

| Tool | Purpose |
|------|---------|
| React Native | Mobile app development |
| SQLite (`react-native-sqlite-storage`) | Local relational DB |
| React Navigation | Navigation |
| React Native Paper  | UI components |

---

## 💡 Ideal For:
- React Native learners mastering SQLite
- Final-year student project
- Freelancers building education/institute apps
- Offline-capable local database apps

---

## 📬 Stay Connected

📺 YouTube: [Engineer Codewala]  
🌐 Website: [engineercodewala.in]  
📷 Instagram: [@engineercodewala]  


---

### 📌 Don’t forget to Star ⭐ this repo and Subscribe 🔔 to follow the full series!
