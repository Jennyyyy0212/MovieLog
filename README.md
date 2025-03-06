# 📽️ MovieLog – Log Your Watched Movies 🎬

MovieLog is a simple and intuitive movie tracking app that helps you log, rate, and review movies you've watched. Keep track of your viewing history and never forget your favorite films!

🚀 Features
- ✅ Movie Logging – Easily add movies to your watched list.
- ✅ Ratings & Reviews – Rate and review movies you’ve seen.
- ✅ Watchlist – Save movies you want to watch later.
- ✅ User Profiles – Track your personal movie history.
- ✅ Search & Discover – Find new movies to watch.

## Table of Contents

- [Installation](#installation)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
- [Frontend](#frontend)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/movie-rating-api.git
   cd movie-rating-api
   ```
2. Install backend dependencies:
    ```
    npm install
    ```
3. Install frontend dependencies:
    ```
    cd frontend
    npm install
    ```


## Backend
### Running the Backend
1. Create a `.env` file in the root directory and add the following environment variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_api_key
```
2. Start the backend server
```
npm run dev
```

### API Endpoints
- Auth Routes (/api/auth)
    - `POST /register`: Register a new user
    - `POST /login`: Log in a user
- Movie Routes (/api/movies)
    - `POST /search`: Search for movies by title
    - `GET /movie/:id`: Get movie details by ID
- Review Routes (/api/reviews)
    - `POST /`: Add or update a personal review
    - `GET /`: Get personal reviews
- External Routes (/api/external)
    - `GET /trending`: Get trending movies from TMDB


## Frontend
### Running the Frontend
1. Navigate to the `frontend` directory:
```
cd frontend
```
2. Start the frontend development server:
```
npm start
```

## Environment Variables
The following environment variables are required for the backend:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `TMDB_API_KEY`: API key for The Movie Database (TMDB)


## License
This project is licensed under the MIT License.

## Contact
💡 Questions or feedback? Reach out on GitHub Issues

🎬 Happy Movie Logging! 🍿
