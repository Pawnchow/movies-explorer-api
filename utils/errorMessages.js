// TODO пощупать i18n для перевода

const ERRORS = {
  AUTH_ERROR: 'Неправильные email или пароль',
  AUTH_REQUIRED: 'Необходима авторизация',
  URL_ERROR: 'Неподходящая ссылка',
  WRONG_EMAIL: 'Неподоходящий email',
  WRONG_MOVIE_CREATE_DATA: 'Переданы неподходящие данные при создании фильма',
  WRONG_MOVIE_DELETE_DATA: 'Переданы неподходящие данные при удалении фильма',
  MOVIE_NOT_FOUND: 'Фильм с указанным id не найден',
  MOVIE_DELETE_FORBIDDEN: 'Нет прав на удаление фильма',
  EMAIL_EXIST: 'Пользователь с таким email уже зарегистрирован',
  WRONG_USER_CREATE_DATA: 'Переданы некорректные данные при создании пользователя',
  WRONG_USER_UPDATE_DATA: 'Переданы некорректные данные при обновлении профиля',
  USER_NOT_FOUND: 'Пользователь не найден',
  RATE_LIMIT_ERROR: 'Превышен лимит запросов',
  INTERNAL_ERROR: 'На сервере произошла ошибка',
  PAGE_NOT_FOUND: 'Страница не найдена',
};

module.exports = ERRORS;
