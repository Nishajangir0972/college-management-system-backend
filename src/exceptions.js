export class httpError { }

export class httpForbiddenException extends httpError {
  constructor(message) {
    super();
    this.code = 403;
    this.message = message;
  }
}
export class UnprocessableEntityException extends httpError {
  constructor(message) {
    super();
    this.status = 422;
    this.message = message;
  }
}
export class UnauthorisedException extends httpError {
  constructor(message) {
    super();
    this.status = 401;
    this.message = message;
  }
}
export class forbiddenException extends httpError {
  constructor(message) {
    super();
    this.status = 403;
    this.message = message;
  }
}

export class NotFoundException extends httpError {
  constructor(message) {
    super();
    this.status = 404;
    this.message = message;
  }
}