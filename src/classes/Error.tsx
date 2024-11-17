class CustomError {
    private status: number;
    private name: string;
    private message: string;

    constructor(status: number, name: string, message: string) {
        this.status = status;
        this.name = name;
        this.message = message;
    }

    static createNew200() {
        return new CustomError(200, "OK", "Everything is working fine.");
    }

    setError(error: Error) {
        switch (error.name) {
            case 'TypeError':
                this.status = 503;
                this.name = "Service Unavailable";
                this.message = "Failed to connect to the server. Please try again later.";
                break;
            case 'SyntaxError':
                this.status = 400;
                this.name = "Bad Request";
                this.message = "There was an issue processing the server's response. Please try again later.";
                break;
            default:
                this.status = 500;
                this.name = "Internal Server Error";
                this.message = "Something went wrong on our end. Please try again later.";
                break;
        }
    }

    get Status() {
        return this.status
    }

    get Name() {
        return this.name
    }

    get Message() {
        return this.message
    }
}

const error = CustomError.createNew200()
export { error, CustomError };