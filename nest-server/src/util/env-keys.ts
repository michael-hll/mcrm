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
      }
    }
  }
export {}