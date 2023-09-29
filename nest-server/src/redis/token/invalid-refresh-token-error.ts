export class InvalidRefreshTokenError extends Error {
    constructor(message?: string) {
        const defaultErrorMessage = 'Access denied.';
        super(message ?? defaultErrorMessage);
        this.name = InvalidRefreshTokenError.name;
    }
}