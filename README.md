# 🎮 Game Store Web App 🎮

A full-stack web application for browsing and purchasing games, built with **ASP.NET Core (C#)** and **vanilla JavaScript**.

## 📝 Note 📝

This is a personal project I picked up in order to learn CRUD operations & ASP.NET Core (C#), as well as to refresh my JavaScript skills.

---

## 🚀 Features 🚀

### 🛒 Game Store 🛒

* Browse a list of available games
* View game details (name, genre, price, release date)
* Dynamic rendering using JavaScript

### 🎯 Filtering & Sorting 🎯

* Filter games by genre
* Sort games by price (ascending / descending)
* Reset to default ordering

### 🧺 Shopping Cart 🧺

* Add games to cart
* Prevent duplicate items
* Remove items with confirmation modal
* Persistent cart using `localStorage`
* Live/Dynamic total price calculation

### 💬 UI/UX 💬

* Custom modal confirmation
* Smooth animations when adding/removing items
* Color-coded pricing system

---

## 🛠️ Tech Stack 🛠️

### Backend

* **C# / ASP.NET Core API**
* **Entity Framework Core**
* **RESTful endpoints**

### Frontend

* **JavaScript (Vanilla)**
* **HTML5**
* **CSS3 (Custom styling, Flexbox & Grid)**

---

## 📡 API Endpoints 📡

### Get all games

```
GET /games
```

### Filter by genre

```
GET /games?genre=Action
```

### Get game by ID

```
GET /games/{id}
```

### Create game

```
POST /games
```

### Update game

```
PUT /games/{id}
```

### Delete game

```
DELETE /games/{id}
```

---

## 📦 Project Structure 📦

```
GameStore/
│
├── GameStore.Api/
│   ├── Endpoints/
│   ├── Models/
│   ├── Dtos/
│   └── Data/
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
```

---

## ▶️ Getting Started ▶️

### 1. Clone the repository

```
git clone https://github.com/psi0n1c/GameStore.git
```

### 2. Run backend

```
cd GameStore.Api
dotnet run
```

### 3. Open frontend

Open `index.html` in your browser

---

## 💡 Future Improvements 💡

* 🔍 Search functionality
* 📄 Pagination
* 🔐 User authentication
* 🧾 Order history
* 💬 Responsiveness

---

## 📊 Project Highlights 📊

* Full CRUD backend with filtering
* State management in vanilla JavaScript
* Custom modal system (callback-based)

---

## 🧠 What I Learned 🧠

* Building REST APIs with ASP.NET Core
* Handling asynchronous operations with `fetch`
* Structuring a full-stack project

