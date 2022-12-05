require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./utils/rateLimiter');
const { corsOptions, MONGO_DEV_URL } = require('./utils/serverConfig');

const { PORT = 3000, MONGO_URL = MONGO_DEV_URL } = process.env;
mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(cors(corsOptions));

// Логгер запросов
app.use(requestLogger);

app.use(rateLimiter);
app.use(router);

// Логгер ошибок
app.use(errorLogger);

// Обработчик ошибок Celebrate
app.use(errors());

// Обработчик внутренних ошибок
app.use(errorHandler);

app.listen(PORT);
