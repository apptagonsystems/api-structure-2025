import bcrypt from 'bcrypt';


class PasswordHelper {
  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }

  public static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}

export default PasswordHelper;