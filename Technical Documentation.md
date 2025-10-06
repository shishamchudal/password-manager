# **SecureVault: Self-Hosted Password Management System**

**Technical Documentation**

Prepared by: Shisham Chudal

Westcliff University – CAP 490 Capstone Project

Version 1.0

October 5, 2025

---

## **Revision History**

| Version | Date            | Author         | Description                                |
| ------- | --------------- | -------------- | ------------------------------------------ |
| 1.0     | October 5, 2025 | Shisham Chudal | Initial version of technical documentation |

---

## **Table of Contents**

1. Abbreviations and Acronyms
2. Introduction
3. Purpose and Objectives
4. Project Scope
5. System Overview

---

## **Abbreviations and Acronyms**

| Term  | Definition                         |
| ----- | ---------------------------------- |
| AES   | Advanced Encryption Standard       |
| API   | Application Programming Interface  |
| CRUD  | Create, Read, Update, Delete       |
| DFD   | Data Flow Diagram                  |
| HTTPS | HyperText Transfer Protocol Secure |
| JWT   | JSON Web Token                     |
| UI    | User Interface                     |
| TLS   | Transport Layer Security           |
| 2FA   | Two-Factor Authentication          |
| DB    | Database                           |

---

## **1. Introduction**

In the digital era, organizations rely on a multitude of web services, platforms, and applications — each requiring unique and secure credentials. As businesses expand their online footprint, the number of passwords and sensitive credentials that must be managed grows exponentially. This complexity often leads to poor security practices, such as password reuse, storage in plaintext files, or reliance on browser-based password managers. These practices leave organizations vulnerable to data breaches, unauthorized access, financial losses, and reputational damage (Anderson, 2020).

**SecureVault: Self-Hosted Password Management System** is designed to address these challenges by providing a secure, user-friendly, and organizationally controlled platform for managing credentials. Unlike commercial password managers that store data on third-party servers, SecureVault allows businesses — especially small-to-medium enterprises (SMEs) — to self-host the solution. This ensures complete data ownership and control, reducing external dependency and enhancing compliance with data security regulations.

---

## **2. Purpose and Objectives**

### **2.1 Purpose**

The purpose of this documentation is to provide a comprehensive, non-technical yet detailed explanation of the design, architecture, functionality, and implementation of the SecureVault system. It serves as a reference for stakeholders — including business leaders, project managers, and non-technical staff — to understand how the system functions, why it is necessary, and how it can be deployed effectively within an organization.

### **2.2 Objectives**

The main objectives of the SecureVault project are:

* 🔐 **Enhance Credential Security:** Eliminate insecure password storage practices and ensure credentials are protected using robust encryption mechanisms.
* ☁️ **Data Ownership and Compliance:** Provide a self-hosted solution, giving organizations full control of their data while ensuring compliance with data protection standards.
* 🧑‍💼 **User-Friendly Experience:** Design an intuitive interface that allows non-technical users to easily manage credentials without extensive training.
* 📈 **Scalability and Flexibility:** Ensure the system can scale with organizational growth and adapt to evolving security needs.
* ⚙️ **Seamless Integration:** Provide a web-based interface that integrates easily into existing IT environments and workflows.

---

## **3. Project Scope**

The scope of SecureVault encompasses the design and development of a secure web-based password management system. It includes the following key components:

* User authentication with hashed master passwords.
* Secure password storage using AES-256 encryption.
* CRUD operations for credential management (create, read, update, delete).
* Simple and intuitive user dashboard for password management.
* Optional Two-Factor Authentication (2FA) for enhanced login security.
* Deployment support for both **self-hosted environments** and **AWS cloud infrastructure**.

### **3.1 Out of Scope**

The following features are **excluded** from the initial version of the project but may be considered for future releases:

* Role-Based Access Control (RBAC)
* Audit logging and reporting
* Security policies and advanced settings

---

## **4. System Overview**

### **4.1 Problem Statement**

Many organizations, especially small and medium-sized businesses, lack secure password management systems. They often rely on manual methods (spreadsheets, shared documents) or consumer-grade password managers that do not provide sufficient control or visibility. These practices increase exposure to cyber threats, including credential theft, phishing attacks, and insider threats (Stallings, 2017).

### **4.2 Solution Summary**

SecureVault is a **web-based password management system** designed to solve these challenges by offering:

* **Self-Hosting Capability:** Organizations can host the solution on-premises or in their private cloud, ensuring that no third-party has access to sensitive credentials.
* **Strong Encryption:** Credentials are encrypted using **AES-256**, one of the most widely trusted encryption standards.
* **Secure Authentication:** Master passwords are hashed with **bcrypt** to prevent reverse-engineering in case of database compromise.
* **User-Centric Interface:** A simple and clean dashboard enables users to store, view, update, and delete passwords effortlessly.
* **Data Protection in Transit:** All communication between client and server is secured using **HTTPS/TLS**.

### **4.3 Business Benefits**

* ✅ **Enhanced Security:** Reduces the risk of password-related breaches by eliminating insecure storage methods.
* ✅ **Regulatory Compliance:** Helps organizations meet data protection requirements by keeping sensitive data on-premises.
* ✅ **Cost-Effective:** Removes reliance on subscription-based commercial solutions.
* ✅ **Operational Control:** Full control over deployment, data storage, and access policies.

## **5. System Architecture**

SecureVault is built using a **three-tier architecture** that separates the presentation, application, and data layers. This design ensures scalability, modularity, and security while making it easier to manage, update, and expand the system in the future. Each layer has a distinct role, as described below:

### **5.1 Architecture Layers**

1. **Presentation Layer (Frontend):**

   * Built using **React** or **Vue.js**, this layer is the user-facing part of the application.
   * It provides an intuitive web interface where users can register, log in, and manage their credentials.
   * The frontend communicates with the backend through RESTful APIs over **HTTPS/TLS**.

2. **Application Layer (Backend):**

   * Developed using **Node.js** and **Express**, this layer handles all core business logic, authentication, encryption, and decryption operations.
   * It verifies user credentials, generates and validates **JWT tokens**, and securely processes requests.
   * It also manages encryption before writing data to the database and decryption when retrieving credentials.

3. **Data Layer (Database):**

   * The database stores encrypted password data and user metadata.
   * **MongoDB** is used for its scalability, flexibility, and JSON-like document structure.
   * No plaintext passwords are ever stored — all credentials are encrypted with **AES-256** before insertion, and master passwords are stored as **bcrypt hashes**.

---

### **5.2 System Architecture Diagram (Text Representation)**

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                   │
│             (React / Vue.js Frontend UI)               │
│   - User Dashboard                                     │
│   - Credential Forms                                   │
│   - Input Validation                                   │
└─────────────────────────────────────────────────────────┘
                    │ HTTPS/TLS + JWT
                    ▼
┌─────────────────────────────────────────────────────────┐
│                  Application Layer                      │
│               (Node.js + Express API)                  │
│   - Authentication (JWT)                               │
│   - AES-256 Encryption / Decryption                    │
│   - Business Logic (CRUD)                              │
│   - Input Sanitization & Validation                    │
└─────────────────────────────────────────────────────────┘
                    │ Encrypted Data
                    ▼
┌─────────────────────────────────────────────────────────┐
│                      Data Layer                         │
│                    (MongoDB)                            │
│   - Encrypted Password Records                          │
│   - Bcrypt-Hashed Master Passwords                      │
│   - Metadata (labels, timestamps)                       │
└─────────────────────────────────────────────────────────┘
```

This architecture ensures strong security at every layer — from encrypted data transmission via TLS to encrypted storage using AES-256.

---

## **6. Core Components**

The SecureVault system is made up of several essential components, each responsible for a specific part of the password management process.

### **6.1 Frontend (Presentation Layer)**

The frontend provides the interface through which users interact with SecureVault. It includes:

* **Login/Registration Pages:** Secure authentication entry points.
* **Dashboard:** Central control panel displaying stored passwords (masked), account labels, and options to add, update, or delete credentials.
* **Password Forms:** Input fields for storing new credentials with validation checks (e.g., strong password suggestions, required fields).
* **Security Features:**

  * Automatic session expiration.
  * “Show/Hide” password toggle.
  * Optional 2FA prompt.

The frontend communicates exclusively with the backend through HTTPS-secured REST API calls, ensuring data is never exposed in plaintext.

---

### **6.2 Backend (Application Layer)**

The backend is the heart of SecureVault, performing most of the critical security and processing tasks. Its main components include:

* **Authentication Module:**

  * Handles user login and registration.
  * Master passwords are hashed using **bcrypt** before storage.
  * Upon successful authentication, a **JWT** is issued and returned to the client for session validation.

* **Encryption/Decryption Module:**

  * Encrypts passwords with **AES-256** before storing them.
  * Decrypts data only in memory during retrieval, never storing plaintext on disk.
  * Key management uses a derived key based on user credentials and secure random salts.

* **CRUD Operations:**

  * Create, Read, Update, Delete operations are provided via secure API endpoints.
  * All requests must include a valid JWT to ensure authenticated access.

* **Validation & Sanitization:**

  * All inputs are validated to prevent **XSS**, **SQL injection**, and **command injection** attacks.
  * Helmet.js is used for securing HTTP headers.

---

### **6.3 Database (Data Layer)**

The **MongoDB** database stores all user data and password records in encrypted form. Collections include:

* **Users Collection:**

  * `_id`, `email`, `hashed_password`, `created_at`

* **Passwords Collection:**

  * `_id`, `user_id`, `label`, `username`, `encrypted_password`, `iv`, `salt`, `created_at`, `updated_at`

At no point is the plaintext password or decryption key stored in the database.

---

## **7. Data Flow Diagrams (DFDs)**

To better understand how SecureVault processes requests, the following simplified **data flow** outlines a typical user action — **adding a password**.

### **7.1 Password Creation Flow**

```
[User] 
   │
   ▼
[Frontend: Submit password data]
   │ HTTPS + JWT
   ▼
[Backend: Validate input, derive encryption key]
   │
   ▼
[Backend: Encrypt password with AES-256]
   │
   ▼
[Database: Store encrypted password + metadata]
   │
   ▼
[Backend: Return success response]
   │
   ▼
[Frontend: Display confirmation message]
```
![image](/images/password_creation_flow.png)

### **7.2 Password Retrieval Flow**

```
[User]
   │
   ▼
[Frontend: Request password]
   │ HTTPS + JWT
   ▼
[Backend: Verify token and user identity]
   │
   ▼
[Backend: Fetch encrypted password from DB]
   │
   ▼
[Backend: Decrypt password in memory]
   │
   ▼
[Frontend: Display masked password to user]
```
![image](/images/password_retrival_flow.png)

This secure flow ensures that sensitive data is **encrypted at rest**, **transmitted securely**, and **never exposed** outside the controlled environment.

---

## **8. Authentication and Session Management**

SecureVault uses **JWT-based authentication** to maintain stateless sessions. The process is as follows:

1. **User Login:** The user provides credentials, which are verified against bcrypt-hashed values in the database.
2. **Token Issuance:** If credentials are valid, a JWT is generated and signed with a server-side secret.
3. **Session Management:** The JWT is stored client-side (in secure storage) and attached to every API request in the `Authorization` header.
4. **Token Verification:** On each request, the backend verifies the token before granting access.
5. **Expiration & Renewal:** Tokens expire after a set period (e.g., 1 hour) and require re-authentication for continued access.

This approach eliminates the need for traditional server-side sessions and enhances scalability while maintaining strong security controls.

Entity relationship diagram.
![image](/images/Entity%20Relationship%20Diagram.png)

https://www.mongomodeler.com/editor.html

Sequence diagram\
already done

Data flow diagram.


Flow chart.