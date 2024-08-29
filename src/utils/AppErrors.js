/* eslint-disable max-classes-per-file */

export class AppError extends Error {
  /**
   * @param {String} message Descrição do que causou o erro
   * @param {Number} status  Código de status http
   * @param {*} type Um resumo do tipo do erro
   */
  constructor(message, status, type) {
    super(message);
    this.error = true;
    this.status = status;
    this.type = type;
    this.msg = this.message;
  }
}

export class BadRequestError extends AppError {
  constructor(message) {
    super(message, 400, 'Bad Request');
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404, 'Not Found');
  }
}

export class InternalServerError extends AppError {
  constructor(message) {
    super(message, 500, 'Internal Server Error');
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message) {
    super(message, 503, 'Service Unavailable');
  }
}
