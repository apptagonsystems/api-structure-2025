// import { customAlphabet } from 'nanoid';

// const nanoid = customAlphabet('0123456789', 12);


class UtitlitiesHelper {
  public static getFormattedDate(date: Date): string {
    return date.toISOString();
  }

    // public static generateRandomId(): string {
    //     return nanoid();
    // }
    
    public static isPasswordStrong (password: string): boolean {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
      
        return password.length >= minLength &&
          hasUpperCase &&
          hasLowerCase &&
          hasNumbers &&
          hasSpecialChar;
      }

    public static  formatZodError (error: any): any {
      let errors: any = {}
      console.log('formatZodError',error);
         error.errors?.map((err: any) => {
          errors[err.path?.[0]] = err.message;
        });

        return errors;
    }
}


export default UtitlitiesHelper;