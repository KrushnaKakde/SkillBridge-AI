<div align="center">

# <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bridge%20at%20Night.png" alt="Bridge at Night" width="35" height="35" /> SkillBridge AI

**AI-Powered Interview Preparation Platform**

[![Made with React](https://img.shields.io/badge/React-19.2.0-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Made with Node.js](https://img.shields.io/badge/Node.js-5.x-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Backend - Express](https://img.shields.io/badge/Express-5.2.1-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Database - MongoDB](https://img.shields.io/badge/MongoDB-9.2.1-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![AI - Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![UI - Sass](https://img.shields.io/badge/UI-Sass-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](#license)

**Analyze resumes → Generate interview questions → Build preparation roadmaps → Download tailored resumes**

---

</div>

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png" alt="Rocket" width="25" height="25" /> Features

| Feature | Description |
|---------|-------------|
| <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Clipboard.png" alt="Clipboard" width="20" height="20" /> **Resume Analysis** | Upload your resume PDF and let AI extract key skills, experience, and context |
| <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Memo.png" alt="Memo" width="20" height="20" /> **Smart Question Bank** | Get technical + behavioral questions tailored to your resume and target job |
| <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Bar%20Chart.png" alt="Bar Chart" width="20" height="20" /> **Match Score** | Instant match percentage between your profile and the job description |
| <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Target.png" alt="Target" width="20" height="20" /> **Skill Gap Detection** | Identify missing skills that matter most for the target role |
| <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Calendar.png" alt="Calendar" width="20" height="20" /> **Preparation Roadmap** | Day-by-day study plan with clear focus areas and tasks |
| <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Page%20Facing%20Up.png" alt="Page Facing Up" width="20" height="20" /> **Tailored Resume PDF** | Download an AI-optimized resume version built for the target job |
| <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/File%20Cabinet.png" alt="File Cabinet" width="20" height="20" /> **Report History** | Save all interview reports and revisit them anytime from your dashboard |

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/High%20Speed%20Train.png" alt="High Speed Train" width="25" height="25" /> Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- [Google AI Studio API Key](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/KrushnaKakde/SkillBridge-AI.git
cd SkillBridge-AI
```

### 2. Install dependencies

```bash
# Backend
cd Backend
npm install

# Frontend (new terminal)
cd ../Frontend
npm install
```

### 3. Configure environment variables

```bash
# Backend
cp .env.example .env
# Then edit Backend/.env with your MongoDB URL, JWT secret, and Google API key

# Frontend
cp .env.example .env.local
# Edit if your backend is on a different port or host
```

### 4. Run the application

```bash
# Terminal 1 - Backend (runs on :3000)
cd Backend
npm run dev

# Terminal 2 - Frontend (runs on :5173)
cd Frontend
npm run dev
```

Then open **http://localhost:5173** in your browser.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Building%20Construction.png" alt="Building Construction" width="25" height="25" /> Project Structure

```
SkillBridge-AI/
├── Backend/                             # Node.js + Express REST API
│   ├── src/
│   │   ├── config/database.js           # MongoDB connection setup
│   │   ├── controllers/                 # Request handlers (auth, interview)
│   │   ├── middlewares/                 # Auth guards, file upload
│   │   ├── models/                      # Mongoose schemas
│   │   ├── routes/                      # REST route definitions
│   │   ├── services/ai.service.js       # Gemini AI integrations
│   │   └── app.js                       # Express app + global middleware
│   ├── server.js                        # HTTP server entry point
│   ├── .env.example                     # Backend env template
│   └── package.json
│
└── Frontend/                            # React 19 + Vite SPA
    ├── src/
    │   ├── features/
    │   │   ├── auth/                    # Login / Register flows
    │   │   └── interview/               # Home + Interview pages
    │   ├── App.jsx
    │   ├── app.routes.jsx
    │   ├── main.jsx
    │   └── style.scss                   # Global styles
    ├── .env.example                     # Frontend env template
    └── package.json
```

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Cable.png" alt="Cable" width="25" height="25" /> API Overview

### Auth — `/api/auth`

| Method | Endpoint     | Access  | Description             |
| :----- | :----------- | :------ | :---------------------- |
| POST   | `/register`  | Public  | Create a new user       |
| POST   | `/login`     | Public  | Log in an existing user |
| POST   | `/logout`    | Private | Log out current user    |
| GET    | `/me`        | Private | Get current user info   |

### Interview — `/api/interview`

| Method | Endpoint                         | Access  | Description                             |
| :----- | :------------------------------- | :------ | :-------------------------------------- |
| POST   | `/generate`                     | Private | Generate a new interview report (multipart, accepts PDF resume) |
| GET    | `/reports`                      | Private | List all reports (summarized)           |
| GET    | `/reports/:interviewId`         | Private | Get a full report by ID                 |
| GET    | `/resume/:interviewReportId`    | Private | Download tailored resume PDF for report |

Authentication works via **httpOnly cookies** (default) or **Authorization: Bearer \<token\>** header.

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Toolbox.png" alt="Toolbox" width="25" height="25" /> Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express 5
- **ODM:** Mongoose (MongoDB)
- **Auth:** JWT + bcryptjs (with token blacklist on logout)
- **Validation:** Zod
- **AI:** Google Generative AI (Gemini)
- **File handling:** Multer + pdf-parse
- **PDF generation:** Puppeteer

### Frontend
- **UI Library:** React 19
- **Bundler:** Vite 7
- **Styling:** Sass (SCSS modules)
- **Routing:** React Router 7
- **HTTP Client:** Axios

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Lock.png" alt="Lock" width="25" height="25" /> Security

- Passwords hashed with **bcryptjs** (10 rounds)
- JWT cookies use **httpOnly**, **sameSite**, and **secure** flags (auto-configured by env)
- Bearer token fallback for non-browser clients
- Blacklisted JWT tokens on logout
- Input validation and trimmed / lowercased emails for case-insensitive uniqueness
- Global error handler (no stack traces leaked in production)
- CORS origin restricted via `CLIENT_ORIGIN` environment variable
- Report ownership enforced (user-A cannot fetch / download user-B reports)

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Hand%20gestures/Handshake.png" alt="Handshake" width="25" height="25" /> Contributing

Contributions, issues, and feature requests are welcome!<br/>
Feel free to check the [issues page](https://github.com/KrushnaKakde/SkillBridge-AI/issues).

1. Fork the project
2. Create your feature branch: `git checkout -b feat/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feat/amazing-feature`
5. Open a pull request

## <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Symbols/Information.png" alt="Information" width="25" height="25" /> License

This project is [ISC](LICENSE) licensed.

---

<div align="center">

**Built with <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Beating%20Heart.png" alt="Beating Heart" width="20" height="20" /> by Krushna Kakde**

&nbsp;[Report Bug](https://github.com/KrushnaKakde/SkillBridge-AI/issues/new) &nbsp;•&nbsp; [Request Feature](https://github.com/KrushnaKakde/SkillBridge-AI/issues/new)

</div>
