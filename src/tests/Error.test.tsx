import { CustomError, error } from "../classes/Error"

describe('Error class', () => {
    it('should create an instance of Error class', () => {
        const fakeError = new CustomError(123, "Test Error", "Test Message");
        expect(fakeError.Status).toBe(123)
        expect(fakeError.Name).toBe("Test Error")
        expect(fakeError.Message).toBe("Test Message")
    })
    
    it('should create an instance of Error class with 200 status', () => {
        const fakeError = CustomError.createNew200()
        expect(fakeError.Status).toBe(200)
        expect(fakeError.Name).toBe("OK")
        expect(fakeError.Message).toBe("Everything is working fine.")
    })

    it('should set error for TypeError', () => {
        error.setError(new TypeError())
        expect(error.Status).toBe(503);
        expect(error.Name).toBe("Service Unavailable");
        expect(error.Message).toBe("Failed to connect to the server. Please try again later.");
    })

    it('should set error for SyntaxError', () => {
        error.setError(new SyntaxError());
        expect(error.Status).toBe(400);
        expect(error.Name).toBe("Bad Request");
        expect(error.Message).toBe("There was an issue processing the server's response. Please try again later.");
    });
    
    it('should set error for unknown errors', () => {
        error.setError(new Error("UnknownError"));
        expect(error.Status).toBe(500);
        expect(error.Name).toBe("Internal Server Error");
        expect(error.Message).toBe("Something went wrong on our end. Please try again later.");
    });
})