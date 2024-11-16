class CustomError {
    private status: number;
    private name: string;
    private message: string;

    constructor(status: number, name: string, message: string) {
        this.status = status;
        this.name = name;
        this.message = message;
    }

    static empty() {
        return new CustomError(0, "", "")
    }

    setError(status: number, name: string, message: string) {
        this.status = status;
        this.name = name;
        this.message = message;
    }

    get error() {
        return {
            status: this.status,
            name: this.name,
            message: this.message
        };
    }
}

const error = CustomError.empty();
export { error, CustomError };
