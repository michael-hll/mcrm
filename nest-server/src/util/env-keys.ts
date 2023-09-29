declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production";
        DATABASE_NAME: string;
        DATABASE_USER: string;
        DATABASE_PASSWORD: string;
        DATABASE_HOST: string;
        DATABASE_PORT: string; 
        AUTH_SECRET: string;
        AUTH_EXPIRES_IN: string;
        JWT_SECRET: string;
        JWT_TOKEN_AUDIENCE: string;
        JWT_TOKEN_ISSUER: string;
        JWT_ACCESS_TOKEN_TTL: string;
        JWT_REFRESH_TOKEN_TTL: string;
        REDIS_HOST: string;
        REDIS_PORT: string;
      }
    }
  }
export {}