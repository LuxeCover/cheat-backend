

export class BaseException extends Error {
    statusCode: number;
    error: any;
    stack?: any
    constructor(statusCode: number, message: string, error: any, stack?: any) {
        super(message)
        this.statusCode = statusCode;
        this.error = error;
        this.stack = stack;
    }
}
