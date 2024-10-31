import { StatusCode } from "./statusEnum";

export abstract class AppException {
    readonly message: string;
    readonly status: number;

    constructor(message: string, status: number) {
        this.message = message;
        this.status = status;
    }
}

export class ValidationError extends AppException {
    constructor(message: string) {
        super(message, StatusCode.BadRequest);
    }
}

export class NotFoundError extends AppException {
    constructor(message: string) {
        super(message, StatusCode.NotFound);
    }
}

export class UnknownError extends AppException {
    constructor(message: string = "Unknown Error!", status = StatusCode.ServerError) {
        super(message, status)
    }
}

export class UnauthorizedError extends AppException {
    constructor(message: string){
        super(message, StatusCode.Unauthorized);
    }
}