import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


class JWTHelper {
  public static async accessToken(payload: any): Promise<string> {
    return jsonwebtoken.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
      expiresIn: "30s",
    });
  }

  public static async refreshToken(payload: any): Promise<string> {
    return jsonwebtoken.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
      expiresIn: "1d",
    });
  }

  public static async verifyToken(token: any): Promise<any> {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
  }

}

export default JWTHelper;
