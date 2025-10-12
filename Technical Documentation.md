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
![image](/images/Data%20Flow%20Diagram.png)

## **9. Encryption and Decryption Engine**

The **encryption engine** is the most critical component of SecureVault. Its purpose is to ensure that sensitive passwords are never stored or transmitted in plaintext. Instead, all credential data is encrypted on the server using strong cryptographic methods before being saved in the database.

SecureVault uses the **Advanced Encryption Standard (AES-256)** in **Galois/Counter Mode (GCM)**. This algorithm is known for its combination of strong security and high performance. It uses a 256-bit key to encrypt and decrypt data, and it provides **confidentiality**, **integrity**, and **authenticity** of the stored information.

---

### **9.1 Encryption Model**

Each user’s passwords are encrypted with a **unique encryption key derived from their master password**. This design ensures that:

* Even if the database is compromised, the attacker cannot decrypt any passwords without knowing the user’s master password.
* Each vault item is encrypted separately, making attacks significantly harder.

SecureVault does not store the master password anywhere. Instead, it derives an encryption key using a **Key Derivation Function (KDF)** such as **PBKDF2** with a random **salt**. This makes brute-force attacks computationally expensive and time-consuming.

---

### **9.2 Encryption Workflow**

Here’s how the encryption process works in SecureVault:

1. **User Input:**
   The user provides their **master password** and the plaintext password to be stored.

2. **Key Derivation:**
   The system uses **PBKDF2** (Password-Based Key Derivation Function 2) to derive a unique encryption key from the master password and a randomly generated salt.

3. **AES Encryption:**
   The plaintext password is encrypted using **AES-256-GCM**, which produces three key values:

   * **Ciphertext:** The encrypted password.
   * **IV (Initialization Vector):** A random value that ensures unique encryption each time.
   * **Auth Tag:** A code used to verify that the data hasn’t been modified.

4. **Storage:**
   The encrypted data, along with the IV, salt, and authentication tag, is stored in MongoDB.

### **Encryption Example (Simplified)**

```
Input:
  Plaintext password: "MyBank@123"
  Master password: "M@ster!Key"

Derived Key (via PBKDF2 + salt):
  e7acfb0b5a49b9f1a7e0... (256 bits)

Encrypted Data (AES-256-GCM):
  {
    ciphertext: "cd8f3a5b3c2...",
    iv: "4d2f3b...",
    tag: "a1b2c3...",
    salt: "8d1e..."
  }

Stored in database:
  {
    user_id: 12345,
    label: "Bank Account",
    username: "user@gmail.com",
    encrypted: {
      ciphertext, iv, tag, salt
    }
  }
```

---

### **9.3 Decryption Workflow**

When a user wants to view a stored password, SecureVault performs the reverse process:

1. The user provides their **master password**.
2. The system retrieves the stored **encrypted object** (ciphertext, IV, salt, tag).
3. It regenerates the encryption key using the same PBKDF2 process.
4. AES-256 decrypts the ciphertext to restore the original plaintext password.

If the wrong master password is provided, the decryption process fails, ensuring the vault remains secure.

---

### **9.4 Security Highlights**

* **End-to-End Protection:** No password is ever transmitted or stored in plaintext.
* **Key Isolation:** Each vault item has its own unique encryption parameters.
* **Tamper Resistance:** AES-GCM’s authentication tag detects any data alteration.
* **Data Privacy:** Without the master password, even system administrators cannot decrypt user data.

---

## **10. Data Lifecycle and Flow**

Below is the step-by-step flow of how data moves through the system.

```
[User Input]
   │
   ▼
[Frontend: Sends encrypted password blob or master password for encryption]
   │ HTTPS (secured with TLS)
   ▼
[Backend: Encrypts using AES-256 + master password key]
   │
   ▼
[Database: Stores encrypted JSON object]
   │
   ▼
[User Requests View]
   │
   ▼
[Backend: Decrypts using master password]
   │
   ▼
[Frontend: Displays decrypted password securely (masked by default)]
```

This ensures that **only the authenticated user** can decrypt and access their own passwords, even within the organization’s network.

---

## **11. Descriptive API Documentation**

The SecureVault API is designed to be secure and intuitive, allowing the frontend application to communicate with the backend via **RESTful HTTPS endpoints**. Every request requires a valid **JWT token** to ensure the user is authenticated.

Below is a **non-technical, descriptive overview** of each major API endpoint.

---

### **11.1 Create Vault Item**

**Endpoint:** `POST /api/vault/`
**Purpose:** Adds a new password entry to the user’s vault.
**What it does:**
The frontend sends an encrypted object (ciphertext, iv, tag, salt) to the backend, along with optional metadata like `label` and `username`. The backend stores this encrypted data in the database.

**Inputs:**

* `label` – A label for the password (e.g., “Gmail”).
* `username` – The account username.
* `encrypted` – The AES-encrypted data object.

**Response:**
Confirmation that the item was stored successfully.

---

### **11.2 Create Vault Item (Demo Encryption)**

**Endpoint:** `POST /api/vault/create-demo-encrypt`
**Purpose:** Used in testing or demo mode.
**What it does:**
The user provides a plaintext password and master password; the backend encrypts it before storing.

**Inputs:**

* `label` – Password label.
* `username` – Account username.
* `passwordPlain` – Plaintext password (for demo use only).
* `masterPassword` – Used to derive encryption key.

**Response:**
Returns confirmation and the encrypted object stored.

---

### **11.3 Get All Vault Items**

**Endpoint:** `GET /api/vault/`
**Purpose:** Retrieves all saved vault entries for the authenticated user.
**What it does:**
The backend fetches each encrypted entry and returns it with metadata (label, username, timestamps). Passwords remain encrypted.

**Response:**
A list of items containing their labels, usernames, and encrypted blobs.

---

### **11.4 View Decrypted Password**

**Endpoint:** `POST /api/vault/:id/view`
**Purpose:** Displays the decrypted password for a specific item.
**What it does:**
The backend decrypts the password using the master password provided in the request and returns the plaintext password temporarily.

**Inputs:**

* `masterPassword` – Used for decryption.

**Response:**
Decrypted password for that specific vault item.

---

### **11.5 Update Vault Item**

**Endpoint:** `PUT /api/vault/:id`
**Purpose:** Updates existing password metadata or replaces its encrypted blob.
**What it does:**
The user can modify the label, username, or upload a newly encrypted password.

**Response:**
Updated record confirmation.

---

### **11.6 Delete Vault Item**

**Endpoint:** `DELETE /api/vault/:id`
**Purpose:** Permanently deletes a vault entry.
**What it does:**
Removes the encrypted record from the database.

**Response:**
Confirmation message: `"Deleted"`.

---

## **12. Deployment Plan**

The deployment of **SecureVault** is designed to be flexible and secure, supporting both **cloud-based (AWS)** and **self-hosted** environments. The deployment approach focuses on maintaining data confidentiality, ensuring system reliability, and minimizing downtime.

---

### **12.1 Deployment Options**

#### **A. Cloud Deployment (AWS)**

Hosting SecureVault on **Amazon Web Services (AWS)** provides scalability, reliability, and security. The core services involved include:

* **Amazon EC2 (Elastic Compute Cloud):**
  Used to host the Node.js/Express backend and serve the React/Vue.js frontend. EC2 instances can be configured with Linux distributions (e.g., Ubuntu Server) for maximum compatibility.

* **Amazon S3 (Simple Storage Service):**
  Stores static frontend assets such as JavaScript bundles, CSS, and images, allowing efficient content delivery.

* **Amazon VPC (Virtual Private Cloud):**
  Provides a secure, isolated environment for backend and database servers, ensuring restricted access through subnets and firewalls.

* **MongoDB Atlas or EC2-hosted MongoDB:**
  Manages the database layer with encryption at rest and automated backups.

* **AWS Certificate Manager (ACM):**
  Provides **SSL/TLS certificates** for HTTPS encryption, securing all communication between client and server.

* **AWS CloudWatch:**
  Monitors server metrics, performance, and logs for proactive issue detection.

#### **B. Self-Hosted Deployment (On-Premises)**

Organizations with strict data control policies may opt for on-premises hosting. In this configuration:

* SecureVault runs on an internal server or private data center.
* Access is limited to users within the corporate network.
* Administrators maintain direct control of backups, updates, and security configurations.

Self-hosting provides full data sovereignty, making it ideal for organizations with regulatory or compliance requirements.

---

### **12.2 Deployment Steps (AWS)**

The high-level deployment process is as follows:

1. **Server Setup:**
   Launch an AWS EC2 instance and install Node.js, MongoDB, and Nginx (for reverse proxy and HTTPS redirection).

2. **Environment Configuration:**
   Define environment variables in a `.env` file, including:

   * `JWT_SECRET` – Used to sign authentication tokens.
   * `DB_URI` – MongoDB connection string.
   * `ENCRYPTION_SECRET` – Key seed used in PBKDF2 key derivation.
   * `PORT` – Application port (default: 8080).

3. **Source Deployment:**
   Clone the SecureVault repository and install dependencies using `npm install`.
   Build the frontend with `npm run build` and serve it through Express or Nginx.

4. **SSL Configuration:**
   Use AWS Certificate Manager to issue an SSL certificate. Update the Nginx configuration to redirect all HTTP traffic to HTTPS.

5. **Testing & Monitoring:**
   Conduct end-to-end testing to verify authentication, encryption, and CRUD functionalities.
   Enable CloudWatch metrics for CPU, memory, and network usage.

---

### **12.3 Backup and Disaster Recovery**

To ensure data integrity and business continuity, the following backup strategies are employed:

* **Automated Backups:** MongoDB performs daily backups with retention policies.
* **Snapshot Backups:** Weekly EC2 instance snapshots are stored in Amazon S3.
* **Disaster Recovery:** In case of a server failure, backups can be restored to a new instance within minutes.
* **Encryption:** Backups are encrypted both at rest and during transmission.

---

## **13. Maintenance and Monitoring**

Maintaining SecureVault is essential to ensure long-term reliability and security. The maintenance plan includes the following key aspects:

### **13.1 Regular Security Updates**

* Periodically update all dependencies (`npm audit fix`).
* Apply security patches for Node.js, MongoDB, and third-party libraries.
* Renew SSL/TLS certificates before expiration.

### **13.2 Performance Monitoring**

* Use **AWS CloudWatch** or **PM2 monitoring** to track CPU load, memory usage, and request latency.
* Implement alerting systems to notify administrators of abnormal activity.

### **13.3 Data Management**

* Schedule automated backups for the MongoDB database.
* Verify backup integrity through regular restoration tests.
* Apply data retention policies to remove outdated or unnecessary records.

### **13.4 User Support and Troubleshooting**

* Maintain an internal wiki or documentation page for common troubleshooting steps.
* Provide clear guidance for users in cases of forgotten master passwords (without compromising security).

---

## **14. Scalability**

SecureVault’s architecture supports horizontal scaling, allowing it to handle growing user demand efficiently.

### **14.1 Horizontal Scaling**

* Multiple backend servers can run in parallel behind an **AWS Elastic Load Balancer (ELB)**.
* Each backend instance is stateless — JWT tokens eliminate the need for shared session storage.
* MongoDB replica sets provide redundancy and read scalability.

### **14.2 Database Scalability**

* MongoDB’s sharding capability can be implemented to distribute data across multiple nodes.
* As the number of users increases, additional shards can be added seamlessly.

### **14.3 Caching and Optimization**

* Implement caching using **Redis** or **in-memory storage** for frequently accessed metadata.
* Optimize queries to minimize database load.

This scalability design ensures that SecureVault remains responsive even as the user base expands across hundreds or thousands of accounts.

---

## **15. Future Enhancements**

While SecureVault provides a secure and functional password management foundation, several enhancements are planned for future versions:

1. **Browser Extension Integration:**
   Develop Chrome and Firefox extensions that allow direct autofill and password capture within browsers.

2. **Biometric Authentication:**
   Add fingerprint and facial recognition support for faster and more secure logins.

3. **Password Breach Detection:**
   Integrate APIs like **Have I Been Pwned** to detect compromised credentials.

4. **Enhanced Reporting:**
   Provide password strength analytics and password reuse alerts for end-users.

5. **Multi-Tenancy:**
   Extend SecureVault to serve multiple organizations under one instance, with isolated data and branding.

These features will enhance both usability and overall security posture in future versions.

---

## **16. Conclusion**

The **SecureVault: Self-Hosted Password Management System** provides a robust, scalable, and user-friendly solution for managing sensitive credentials within an organization. Its **AES-256 encryption**, **JWT-based authentication**, and **self-hosted flexibility** give businesses full control over their data while maintaining industry-grade security standards.

By enabling organizations to host their password management solution independently, SecureVault eliminates dependency on third-party platforms, reduces subscription costs, and enhances data privacy. The combination of a clean user interface, strong cryptographic foundations, and modular architecture ensures that the system is both secure and approachable for non-technical users.

Future developments — such as browser extensions, biometric authentication, and breach detection — will continue to strengthen SecureVault’s role as a trusted enterprise-grade password management platform for small to medium-sized organizations.

---

### **References**

Anderson, R. (2020). *Security engineering: A guide to building dependable distributed systems* (3rd ed.). Wiley.

Bonneau, J., Herley, C., Van Oorschot, P. C., & Stajano, F. (2012). The quest to replace passwords: A framework for comparative evaluation of web authentication schemes. *IEEE Symposium on Security and Privacy*, 553–567. [https://doi.org/10.1109/SP.2012.44](https://doi.org/10.1109/SP.2012.44)

Hughes, B., & Cotterell, M. (2009). *Software project management* (5th ed.). McGraw-Hill Education.

Stallings, W. (2017). *Cryptography and network security: Principles and practice* (7th ed.). Pearson.