/* eslint-disable max-classes-per-file */

export class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.error = true;
  }

  toJson() {
    const jsonObj = {
      message: this.message,
    };

    Object.keys(this).forEach((key) => {
      jsonObj[key] = this[key];
    });

    return jsonObj;
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}

export class InternalServerError extends AppError {
  constructor(message) {
    super(message, 500);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message) {
    super(message, 503);
  }
}
