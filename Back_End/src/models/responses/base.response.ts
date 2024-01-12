export class ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
  error?: {
    // code: number;
    message: string
  }

  private constructor(success: boolean, data?: T, message?: string) {
    this.success = success
    this.data = data
    this.message = message

    // if (!success) {
    //   this.error = {
    //     // code: errorCode,
    //     message: message || 'Internal Server Error'
    //   };
    // }
  }

  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return new ApiResponse<T>(true, data, message)
  }

  static error<T>(message: string): ApiResponse<T> {
    return new ApiResponse<T>(false, undefined, message)
  }
}
