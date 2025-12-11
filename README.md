# 🏸 Sports Facility Booking — Backend

Backend service for the Sports Facility Booking Platform.  
Handles courts, coaches, equipment, bookings, and dynamic pricing rules.

---

## 🚀 Features

### ✔ Multi‑Resource Scheduling
During a booking, backend validates:
- Court availability  
- Coach availability (optional)  
- Equipment stock (rackets, shoes)

### ✔ Dynamic Pricing Engine
Admin can create pricing rules:
- peak (multiplier for specific hours)  
- weekend (flat surcharge)  
- courtType (indoor/outdoor surcharge)

Rules stack automatically when calculating final price.

---

## 🛠 Tech Stack
- Node.js  
- Express.js  
- SQLite (better-sqlite3)  
- CORS  
- dotenv  

---

## 📁 Project Structure


court-app-backend/
├── src/
│   ├── server.js
│   ├── db/
│   │   └── database.js
│   ├── routes/
│   ├── controllers/
│   ├── utils/
├── package.json
├── .gitignore
└── README.md


---

## ⚙ Installation

bash
cd court-app-backend
npm install


## ▶ Running the Backend

bash
npm start


Server runs at:


http://localhost:4000


---

## 🔌 API Endpoints

### 🏟 Courts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /courts | List all courts |
| POST | /courts/admin | Add new court |

### 🧑‍🏫 Coaches

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /coaches | List all coaches |

### 🎒 Equipment

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /equipment | List all equipment |

### 📝 Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /bookings | Creates booking + applies pricing rules |

*Sample request:*

json
{
  "userName": "John Doe",
  "courtId": 1,
  "coachId": 2,
  "rackets": 1,
  "shoes": 1,
  "startTime": "2025-01-22T18:00",
  "endTime": "2025-01-22T19:00"
}


*Sample response:*

json
{
  "id": 10,
  "price": 405,
  "message": "Booking confirmed"
}


---

## 💸 Pricing Rules

### 1. Peak Hour Rule


type: "peak"
value: multiplier (e.g., 1.5)
startHour: number
endHour: number


### 2. Weekend Surcharge


type: "weekend"
value: flat amount (e.g., 50)


### 3. Court Type Surcharge


type: "courtType"
value: flat amount (e.g., 30)


---

## 🧪 Testing with Postman

1. Start backend
2. Send POST request to:


POST http://localhost:4000/bookings


3. Use example JSON shown above
4. Verify response with final dynamic price

---

## 📄 .gitignore (recommended)


node_modules/
.env
*.db
*.db-wal
*.db-shm
logs/
*.log
.DS_Store
dist/
