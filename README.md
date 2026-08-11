<div align="center">

  <img src="frontend/src/assets/logo.png" alt="Kaagaz Logo" width="120" style="border-radius: 20px; margin-bottom: 15px;" />

  <h1>Kaagaz — Smart Personal Document Administration</h1>

  <p><strong>Your important documents shouldn't be scattered, forgotten, or expire without warning.</strong></p>

  <h3>🌐 <a href="https://kaagaz-frontend.onrender.com">Live Demo</a></h3>

  <br />

![Built with React](https://img.shields.io/badge/Built_with-React-61DAFB?style=for-the-badge\&logo=react)
![Powered by Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge\&logo=node.js)
![Database MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge\&logo=mongodb)
![Authentication JWT](https://img.shields.io/badge/Auth-JWT-black?style=for-the-badge\&logo=jsonwebtokens)

</div>

---

## 🛑 The Problem

Important documents are a part of everyday life.

Aadhaar cards, driving licenses, insurance policies, passports, vehicle documents, property papers, certificates, financial documents — they constantly accumulate across phones, laptops, email inboxes, WhatsApp chats, and physical folders.

The real problem isn't just **storing documents**.

It's remembering:

* Where is that document?
* When does it expire?
* Which documents are missing?
* Which insurance needs renewal?
* Do I have everything required for an application?
* What happens when an important document is suddenly needed?

A missed expiry date or misplaced document can turn a simple task into hours of unnecessary stress.

---

## 💡 The Kaagaz Solution

**Kaagaz** is a smart personal document administration platform designed to turn a messy collection of documents into a structured, trackable personal vault.

Instead of treating documents as simple files, Kaagaz treats them as **important life assets**.

It combines secure authentication, structured document management, expiry intelligence, and a personal readiness system into one unified workspace.

Kaagaz answers the question:

> **"Am I ready when I need my documents?"**

From storing a document to understanding its validity, Kaagaz helps users stay prepared.

---

## 🧠 The Personal Document Command Center

Kaagaz isn't just another file-upload application.

It is designed as a **Personal Document Command Center**.

Every document has context:

**Document → Category → Expiry → Status → Readiness**

Instead of opening every file individually to understand its importance, Kaagaz continuously transforms raw documents into actionable information.

For example:

```text
Driving License
       ↓
Vehicle Documents
       ↓
Expiry: 15 Dec 2026
       ↓
Status: Valid
       ↓
Readiness Score ↑
```

This turns passive document storage into an active personal administration system.

---

# 🔥 Killer Features

### 📁 1. Smart Personal Document Vault

Store and organize important documents inside a centralized personal workspace.

Documents can be categorized into:

* 🪪 Identity
* ✈️ Travel
* 🚗 Vehicle
* 🛡️ Insurance
* 🏥 Health
* 🏠 Property
* 💰 Finance
* 📜 Certificates

Instead of searching through random folders, users get a structured document ecosystem.

---

### 📆 2. Smart Expiry Tracking

Kaagaz automatically evaluates document validity based on expiry dates.

Documents are classified into intuitive states:

```text
🟢 VALID
Document is safely within its validity period.

🟡 EXPIRING SOON
Renewal should be planned.

🟠 CRITICAL
The expiry date is approaching quickly.

🔴 EXPIRED
Immediate renewal or replacement may be required.
```

This allows users to see what requires attention without manually checking every document.

---

### 🏆 3. Personal Readiness Index

How prepared are you?

Kaagaz introduces a **Personal Readiness Index** that provides a quick overview of your document preparedness.

The dashboard considers factors such as:

* Important documents available
* Document categories covered
* Valid documents
* Expiring documents
* Expired documents

Instead of showing users a simple file count:

```text
Documents: 18
```

Kaagaz provides meaningful information:

```text
Personal Readiness

        87%
     ━━━━━━━━━━━

✓ Identity covered
✓ Travel covered
✓ Vehicle covered
✓ Insurance covered
⚠ 2 documents need attention
```

The goal is simple:

> **Know your readiness before life asks for your documents.**

---

### 🔒 4. Private & Security-Focused Vault

Personal documents contain sensitive information.

Kaagaz therefore uses an authentication-based architecture to keep each user's document records isolated.

The application uses:

* JWT authentication
* Protected API routes
* User-specific document records
* Secure backend communication
* MongoDB persistence

The system is designed around the principle:

> **Your documents belong to your account.**

---

### 🎨 5. Premium Glassmorphic Interface

Kaagaz isn't designed to feel like a traditional file manager.

The interface combines:

* Dark & ivory visual language
* Glassmorphism
* Paper/parchment textures
* Responsive layouts
* Clean document cards
* Visual status indicators
* Lucide icons
* Smooth navigation

The goal is to make personal administration feel **simple, premium, and human**.

---

### 👤 6. Personal Account System

Users can create their own Kaagaz account and maintain their personal document ecosystem.

The authentication system provides:

```text
Signup
  ↓
Login
  ↓
JWT Authentication
  ↓
Personal Dashboard
  ↓
User-specific Documents
```

Each account maintains its own document records and dashboard information.

---

# 🏗️ How Kaagaz Works

The core workflow is intentionally simple:

```text
              USER
                │
                ▼
        ┌─────────────────┐
        │  Kaagaz Frontend │
        │ React + Vite     │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   Express API   │
        │   Node.js       │
        └────────┬────────┘
                 │
          ┌──────┴──────┐
          ▼             ▼
   ┌────────────┐  ┌────────────┐
   │ JWT Auth   │  │  Multer    │
   │ Middleware │  │  Uploads   │
   └────────────┘  └────────────┘
          │             │
          └──────┬──────┘
                 ▼
        ┌─────────────────┐
        │     MongoDB     │
        │ User + Document │
        │     Records     │
        └─────────────────┘
```

The frontend handles the user experience while the backend manages authentication, document operations, and database communication.

---

# 🛠️ Architecture Stack

We built Kaagaz as a modern full-stack web application focused on usability, security, and maintainability.

### 🎨 Frontend

* **React**
* **Vite**
* **Tailwind CSS**
* **React Router DOM**
* **Lucide React**

The frontend provides the dashboard, authentication screens, document management interface, expiry visualization, and responsive user experience.

### ⚙️ Backend

* **Node.js**
* **Express.js**
* **JWT**
* **Multer**
* **Mongoose**

The backend handles authentication, protected routes, document APIs, uploads, and business logic.

### 🗄️ Database

* **MongoDB**
* **Mongoose ODM**

MongoDB stores user profiles and structured document metadata.

### ☁️ Deployment

* **Render**

The frontend and backend are deployed as separate services for easier scalability and maintenance.

---

# 📂 Project Structure

```text
Kaagaz/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database configuration
│   │   │
│   │   ├── middleware/
│   │   │   ├── authentication middleware
│   │   │   └── multer upload middleware
│   │   │
│   │   ├── models/
│   │   │   ├── User model
│   │   │   └── Document model
│   │   │
│   │   ├── routes/
│   │   │   ├── authentication routes
│   │   │   └── document routes
│   │   │
│   │   └── server.js
│   │
│   ├── uploads/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   │   ├── logo
    │   │   └── background assets
    │   │
    │   ├── components/
    │   │   ├── Sidebar
    │   │   ├── StatCard
    │   │   └── reusable UI components
    │   │
    │   ├── context/
    │   │   └── AuthContext
    │   │
    │   ├── pages/
    │   │   ├── Landing
    │   │   ├── Login
    │   │   ├── Signup
    │   │   └── Dashboard
    │   │
    │   ├── services/
    │   │   └── api.js
    │   │
    │   └── index.css
    │
    ├── vite.config.js
    └── package.json
```

# 🔮 Future Scope

Kaagaz is designed to evolve from a document vault into a complete **Personal Administration Assistant**.

### 🤖 AI Document Understanding

Automatically extract information such as:

```text
Document
   ↓
OCR / AI
   ↓
Document Type
   ↓
Name / Number
   ↓
Issue Date
   ↓
Expiry Date
```

This would reduce manual data entry.

---

### 🔔 Intelligent Renewal Reminders

Instead of simply displaying an expiry date, Kaagaz could proactively remind users:

```text
"Your driving license expires in 30 days."

"Your vehicle insurance expires next month."

"Your passport renewal should be planned soon."
```

---

### 🧠 AI-Powered Document Assistant

Users could ask:

> "Which documents are expiring this month?"

> "Do I have all documents required for a vehicle transfer?"

> "Show me my valid identity documents."

Kaagaz could answer directly from the user's document vault.

---

### 📱 Native Mobile Application

A future Android/iOS application could provide:

* Push notifications
* Camera-based document scanning
* Offline document access
* Biometric authentication
* Quick document sharing

---

### 👨‍👩‍👧 Family Document Management

Kaagaz could eventually support family accounts where users can manage documents for:

* Parents
* Children
* Spouse
* Dependents

while maintaining separate document profiles.

---

# 🎯 Our Vision

Most document applications ask:

> **"Where is your document?"**

Kaagaz aims to ask something more useful:

> **"Are you ready?"**

Because personal administration isn't about collecting files.

It's about being prepared when those files matter.

---

<div align="center">

  <h2>📂 Kaagaz</h2>

  <p><strong>Your documents. Your records. Your readiness.</strong></p>

  <br />

  <p>Built with ❤️ by <strong>Rajesh Kumar</strong></p>

  <p>🚀 Built to make everyday document management simpler.</p>

</div>
