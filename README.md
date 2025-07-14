# Employee Directory Web Interfce

This project is a **responsive**, **interactive** employee directory built using:

- HTML, CSS, JavaScript (Vanilla)
-  Node.js + Express (backend)
-  Local JSON file (`employees.json`) for data persistence

> 📄 Freemarker templating was not used as per the second recommended option to integrate a simple Node.js backend.

---

## Features

- Employee List with: First Name, Last Name, Email, Department, Role
-  Add New Employee
-  Edit Existing Employee
-  Delete Employee
-  Search by Name/Email
-  Filter by Name, Department, Role
-  Sort by First Name or Department
-  Pagination (10/25/50/100)
-  Form Validation
-  Persistent data storage in `data/employees.json` via backend
-  Responsive Layout for Mobile, Tablet, Desktop

---

## Project Structure

employee-dir/
├── data/
│ └── employees.json 
├── public/
│ ├── index.html 
│ ├── addedit.html 
│ ├── css/
│ │ └── styles.css
│ ├── js/
│ │ └── app.js
├── server.js 
├── package.json


---

# Setup & Run Instructions

## 1. Clone the repository

git clone https://github.com/avinroy001/Tacnique.git
cd employee-dir

2. Install dependencies
npm install
3. Start the Node.js server
node server.js
Server runs at http://localhost:3000

Challenges Faced

Ensuring that client-side form validation and server-side persistence worked seamlessly
Preventing stale data after redirect without triggering error messages
Managing correct routes for both static files and backend API endpoints

Future Improvements

Add form-level error messages (like duplicate email check)
Upload employee photos with preview
Role-based permissions
Use Freemarker or template engine for server-side rendering if required

 Tech Stack

Frontend: HTML, CSS, JavaScript (No frameworks)
Backend: Node.js + Express
Data Store: Local file system JSON (employees.json)


