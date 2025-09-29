# 📄 SecurePass – Technical Documentation

## 1. Project Overview

**SecurePass** is a web-based password manager designed to help users securely store, manage, and generate passwords in one centralized platform. As the number of online accounts continues to grow, users often struggle to remember strong and unique passwords for every site. SecurePass solves this problem by providing a secure vault protected by encryption, a user-friendly interface, and a built-in password/passphrase generator.

The application follows a **full-stack architecture** using **React.js** for the frontend and **Express.js with Node.js** for the backend, along with **MongoDB** as the database. It is designed to be production-ready, scalable, and secure.

---

## 2. Project Goals and Objectives

* ✅ Help users improve online security by storing and generating strong passwords.
* ✅ Provide a secure and encrypted password vault accessible from any device.
* ✅ Offer a clean and intuitive user interface for everyday users.
* ✅ Ensure robust security with authentication, hashing, and encryption techniques.
* ✅ Prepare the system for deployment on a cloud platform for public use.

---

## 3. System Architecture

The SecurePass application follows a **three-tier architecture**:

1. **Frontend (Client):**

   * Built with **React.js** as a Single Page Application (SPA).
   * Communicates with the backend via RESTful API calls using Axios/Fetch.
   * Handles user input, routing, and rendering of password vault data.

2. **Backend (Server):**

   * Built with **Node.js** and **Express.js**.
   * Exposes secure REST API endpoints for authentication, vault management, and password generation.
   * Handles encryption, validation, and business logic.

3. **Database (Storage):**

   * **MongoDB** stores user accounts and encrypted password records.
   * Sensitive data is encrypted before storage, ensuring security even if the database is compromised.

4. **Deployment Environment:**

   * Hosted on a cloud platform (e.g., **Render**, **Vercel**, or **Heroku**).
   * Uses environment variables to manage sensitive credentials.

```
[ React.js Frontend ] ⇄ [ Express.js Backend (API) ] ⇄ [ MongoDB Database ]
```

---

## 4. Technology Stack

| Layer            | Technology               | Purpose                                      |
| ---------------- | ------------------------ | -------------------------------------------- |
| Frontend         | React.js                 | SPA UI framework                             |
| Backend          | Node.js + Express.js     | API and business logic                       |
| Database         | MongoDB                  | NoSQL database for user and password storage |
| Authentication   | JWT (JSON Web Tokens)    | Secure user sessions                         |
| Password Hashing | bcrypt                   | Secure password storage                      |
| Encryption       | crypto (AES-256-GCM)     | Encrypt/decrypt stored passwords             |
| Deployment       | Render / Vercel / Heroku | Cloud hosting                                |
| Version Control  | Git + GitHub             | Source code management                       |

---

## 5. Features

### Core Features

* 🔐 **User Authentication:** Sign up, log in, and secure access with JWT tokens.
* 🔑 **Password Vault:** Store credentials with AES-256 encryption.
* 🔁 **Password Generator:** Generate strong passwords with customizable length and complexity.
* 📱 **Responsive UI:** Works on desktop, tablet, and mobile devices.

### Optional Future Features

* 📂 Password categories and search filters
* 🔐 Two-factor authentication (2FA)
* 📓 Secure notes storage

---

## 6. Database Schema

### Users Collection

```json
{
  "_id": "ObjectId",
  "email": "string",
  "passwordHash": "string",
  "createdAt": "Date"
}
```

### VaultItems Collection

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "siteName": "string",
  "username": "string",
  "encrypted": {
    "ciphertext": "string",
    "iv": "string",
    "tag": "string",
    "salt": "string"
  },
  "createdAt": "Date"
}
```

---

## 7. API Endpoints

### Authentication

| Method | Endpoint             | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and receive JWT |

### Vault Management

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| GET    | `/api/vault`     | Get all saved passwords      |
| POST   | `/api/vault`     | Add a new password record    |
| GET    | `/api/vault/:id` | Get a single password record |
| PUT    | `/api/vault/:id` | Update a password record     |
| DELETE | `/api/vault/:id` | Delete a password record     |

---

## 8. Security Mechanisms

1. **Authentication & Authorization:**

   * Implemented using **JWT tokens** to manage user sessions.
   * All protected routes require a valid token.

2. **Password Hashing:**

   * User passwords are hashed using **bcrypt** before storage.
   * Even if the database is compromised, plaintext passwords are not exposed.

3. **Encryption:**

   * Password entries are encrypted with **AES-256-GCM** before being saved to the database.
   * Decryption occurs only after successful authentication.

4. **Input Validation:**

   * All input data is validated on both client and server sides to prevent injection attacks.

5. **HTTPS:**

   * The production deployment uses HTTPS to protect data in transit.

---

## 9. Folder Structure (Backend)

```
securepass-server/
├─ server.js
├─ config/
│  └─ db.js
├─ models/
│  ├─ User.js
│  └─ VaultItem.js
├─ routes/
│  ├─ auth.js
│  └─ vault.js
├─ middleware/
│  └─ auth.js
├─ utils/
│  └─ crypto.js
└─ package.json
```

---

## 10. Setup and Installation

### Prerequisites

* Node.js >= 16
* MongoDB installed locally or via Atlas
* Git installed

### Steps

1. Clone the repository:

```bash
https://github.com/shishamchudal/password-manager
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/securepass
JWT_SECRET=your_jwt_secret
```

4. Run the server:

```bash
npm run dev
```

5. (Frontend) Navigate to the React client and run:

```bash
npm start
```

---

## 11. Deployment Strategy

For deployment, SecurePass will be hosted on a cloud platform. A typical production setup includes:

* Backend: Hosted on **Render** or **Railway**
* Frontend: Deployed to **Vercel** or **Netlify**
* Database: Hosted on **MongoDB Atlas**
* Environment variables configured securely in the cloud platform dashboard.

---

## 12. Future Improvements

* Add **Two-Factor Authentication (2FA)** for enhanced security.
* Implement **role-based access control** for shared vaults.
* Add **secure notes** and **password health check** features.
* Integrate with browser extensions for autofill functionality.

---

## 13. Conclusion

SecurePass is a secure, scalable, and user-friendly password manager designed to make online safety more accessible to everyday users. By combining strong encryption, modern web technologies, and a responsive interface, it provides a reliable solution for storing and managing digital credentials. This project lays the foundation for future enhancements and real-world deployment.