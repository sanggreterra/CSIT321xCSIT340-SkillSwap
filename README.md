# SkillSwap

## 📚 Project Description

**SkillSwap** is a peer-to-peer skill exchange platform that connects people who want to learn with those who want to teach. Users can share their expertise and acquire new skills through mutual exchanges, building a collaborative learning community without monetary transactions.

### Key Features
- **User Profiles & Skill Management** - Create profiles showcasing your skills and learning interests
- **Smart Skill Matching** - Algorithm-based pairing of compatible learners and teachers
- **Messaging & Scheduling** - Direct communication and calendar integration for session planning
- **Rating & Review System** - Build community trust through user feedback
- **Real-time Notifications** - Stay updated on matches, messages, and upcoming sessions
- **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices

---

## 🛠️ Tech Stack

### Frontend
- **React JS** - UI library for building interactive user interfaces
- **React Router** - Client-side routing for navigation
- **Axios** - HTTP client for API communication
- **React Icons** - Icon library for UI elements

### Backend
- **Spring Boot** - Java-based framework for building REST APIs
- **Spring Data JPA** - ORM for database operations
- **Spring Security** - Authentication and authorization
- **JWT (JSON Web Tokens)** - Secure token-based authentication
- **Maven** - Dependency management and project building

### Database
- **MySQL** - Relational database for data persistence
- **Supabase** - PostgreSQL-based backend (future migration)

### Additional Tools
- **Git & GitHub** - Version control and repository hosting
- **Postman** - API testing and documentation
- **Docker** - Containerization (optional, for deployment)

---

## 🚀 Setup & Run Instructions

### Prerequisites

Before you begin, make sure you have the following installed on your computer:

1. **Node.js** (includes npm)
   - Download from: https://nodejs.org/ (LTS version recommended)
   - Verify installation: Open terminal/command prompt and run `node --version` and `npm --version`

2. **Java Development Kit (JDK)** 
   - Download from: https://www.oracle.com/java/technologies/downloads/ (JDK 11 or higher)
   - Verify installation: Run `java --version` in terminal/command prompt

3. **MySQL Server**
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Install and note your username (default: `root`) and password

4. **Git**
   - Download from: https://git-scm.com/
   - Verify installation: Run `git --version`

5. **Text Editor or IDE** (Optional but recommended)
   - Visual Studio Code: https://code.visualstudio.com/
   - IntelliJ IDEA Community Edition: https://www.jetbrains.com/idea/

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/sanggreterra/CSIT321xCSIT340-SkillSwap.git
cd CSIT321xCSIT340-SkillSwap
```

You should now see two main folders:
- `skillswap-backend/` - Spring Boot API
- `skillswap-frontend/` - React application

---

### Step 2: Backend Setup (Spring Boot)

#### 2.1 Navigate to Backend Directory
```bash
cd skillswap-backend
```

#### 2.2 Configure Database Connection

1. Open the file: `src/main/resources/application.properties`
2. Update the following with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/skillswap_db
spring.datasource.username=root
spring.datasource.password=your_mysql_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

**Note:** Replace `your_mysql_password` with your actual MySQL password

#### 2.3 Create the Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE skillswap_db;
```

#### 2.4 Build and Run Backend

**Using Maven Wrapper (Recommended):**
```bash
# On Mac/Linux
./mvnw clean install
./mvnw spring-boot:run

# On Windows
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

**Or using Maven (if installed globally):**
```bash
mvn clean install
mvn spring-boot:run
```

You should see output ending with: `Started SkillSwapBackendApplication in X seconds`

✅ **Backend is now running on:** `http://localhost:8080/api`

---

### Step 3: Frontend Setup (React)

#### 3.1 Open New Terminal and Navigate to Frontend

```bash
# From root directory
cd skillswap-frontend
```

#### 3.2 Install Dependencies

```bash
npm install
```

This will download all required packages (takes 2-5 minutes depending on internet speed)

#### 3.3 Configure API Endpoint

1. Create or verify the `.env` file in the `skillswap-frontend` directory
2. Add the following:

```
REACT_APP_API_URL=http://localhost:8080/api
```

#### 3.4 Start the Development Server

```bash
npm start
```

Your browser will automatically open to: `http://localhost:3000`

✅ **Frontend is now running on:** `http://localhost:3000`

---

### Step 4: Verify Everything is Working

1. **Check Backend API:**
   - Open: `http://localhost:8080/api/health` (or any endpoint you've created)
   - You should see a JSON response

2. **Check Swagger Documentation:**
   - Open: `http://localhost:8080/api/swagger-ui.html`
   - You should see interactive API documentation

3. **Check Frontend:**
   - Navigate to: `http://localhost:3000`
   - You should see the SkillSwap landing page
   - Try navigating to different pages (Login, Signup, Dashboard)

4. **Test API Connection:**
   - Open browser Developer Tools (F12)
   - Go to Network tab
   - Perform any action on the frontend (like login or registration)
   - You should see successful API calls to `localhost:8080/api`

5. **Verify Database:**
   - Open MySQL Workbench
   - Connect to `skillswap_db`
   - Run `SHOW TABLES;`
   - You should see all 12 tables from the ERD

---

## 📁 Project Structure

```
skillswap/
├── skillswap-backend/                # Spring Boot Backend
│   ├── .github/
│   ├── .mvn/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/skillswap/
│   │   │   │   ├── config/           # Configuration classes
│   │   │   │   ├── controller/       # REST API endpoints
│   │   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── exception/        # Exception handlers
│   │   │   │   ├── model/            # Entity classes (12 entities)
│   │   │   │   ├── repository/       # Database access
│   │   │   │   ├── security/         # JWT & authentication
│   │   │   │   ├── service/          # Business logic
│   │   │   │   ├── util/             # Utility classes
│   │   │   │   └── SkillSwapBackendApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                     # Test classes
│   ├── target/
│   ├── .gitattributes
│   ├── .gitignore
│   ├── HELP.md
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml                       # Maven dependencies
│
├── skillswap-frontend/               # React Frontend
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   ├── hooks/                    # Custom React hooks
│   │   ├── pages/                    # Page components
│   │   │   ├── AllCourses/
│   │   │   ├── CourseDetails/
│   │   │   ├── Dashboard/
│   │   │   ├── Login/
│   │   │   ├── Logout/
│   │   │   ├── Settings/
│   │   │   └── Signup/
│   │   ├── services/                 # API service calls
│   │   ├── App.css                   # Main styles
│   │   ├── App.jsx                   # Main component
│   │   ├── index.css                 # Global styles
│   │   ├── index.js                  # Entry point
│   │   ├── reportWebVitals.js
│   │   └── skillswap_icon.png
│   ├── .env                          # Environment variables
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json                  # Dependencies
│   └── README.md
│
└── README.md                         # This file (Root documentation)
```

---

## 🔧 Troubleshooting

### Frontend won't start
- **Error:** `npm: command not found`
  - **Solution:** Node.js is not installed. Download from https://nodejs.org/
  
- **Error:** `Port 3000 is already in use`
  - **Solution:** Close other applications using port 3000 or run: `npm start -- --port 3001`

### Backend won't start
- **Error:** `Could not connect to database`
  - **Solution:** Make sure MySQL is running and your credentials in `application.properties` are correct
  
- **Error:** `Java command not found`
  - **Solution:** JDK is not installed. Download from https://www.oracle.com/java/technologies/downloads/

### API calls failing
- **Error:** `CORS error or 404 Not Found`
  - **Solution:** Make sure both frontend and backend are running on their respective ports
  - Check that `.env` file in frontend has correct `REACT_APP_API_URL`

### Database issues
- **Error:** `Access denied for user 'root'@'localhost'`
  - **Solution:** Check your MySQL password is correct in `application.properties`

---

## 📦 Available Scripts

### Frontend Commands
```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests
npm run eject      # Eject from Create React App (not reversible)
```

### Backend Commands
```bash
mvn clean install  # Clean and build project
mvn spring-boot:run    # Run application
mvn test           # Run tests
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users/{id}/skills` - Get user's skills

### Skills
- `POST /api/skills` - Create skill offering
- `GET /api/skills` - Browse all skills
- `GET /api/skills/search` - Search skills

### Matches & Exchanges
- `GET /api/matches` - Get skill matches
- `POST /api/exchanges` - Create skill exchange
- `GET /api/exchanges` - View exchanges

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add your feature description'`
5. Push: `git push origin feature/your-feature-name`
6. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

- **Project Lead/Lead Developer:** Sang'gre Terra
- **Backend Developer:** Eron Asia
- **Frontend Developer/Designer:** Lee Anne

---

## 📞 Contact & Support

- **GitHub Issues:** https://github.com/sanggreterra/skillswap/issues
- **Discord:** sanggreterramax

---

## 🎉 Thank You!

Thank you for being part of the SkillSwap community! We're excited to help you build meaningful learning connections. Happy skill-sharing! 🚀
