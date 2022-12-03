const corsOptions = {
  origin: [
    'http://movies.pawnchow.nomoredomains.club',
    'https://movies.pawnchow.nomoredomains.club',
    'localhost:3000',
    'http://localhost:3000',
  ],
  credentials: true,
};

const JWT_DEV_KEY = 'some-secret-key';
const MONGO_DEV_URL = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  corsOptions,
  JWT_DEV_KEY,
  MONGO_DEV_URL,
};
