import { customAlphabet } from 'nanoid';
import { hash } from 'bcrypt';

const nanoid = customAlphabet('0123456789', 12);


class UtitlitiesHelper {
  public static getFormattedDate(date: Date): string {
    return date.toISOString();
  }

    public static generateRandomId(): string {
        return nanoid();
    }
    
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
}


export default UtitlitiesHelper;