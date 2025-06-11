class ApiResponse{
    constructor(statusCode, message, data) {
        this.statusCode = statusCode; // HTTP status code
        this.message = message; // Response message
        this.data = data; // Optional data payload
        
    }
}

export  {ApiResponse}