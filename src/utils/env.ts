class Env {
    static PORT: number = parseInt(process.env.PORT as string, 10) || 3000;
    static DATABASE_URL: string = process.env.DATABASE_URL as string;
    static JWT_SECRET: string = process.env.JWT_SECRET as string;
    static REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;
    static ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
    static NODE_ENV: string = process.env.NODE_ENV as string;

}

export default Env;
