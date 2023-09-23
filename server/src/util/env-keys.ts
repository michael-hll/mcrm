declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_NAME: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_HOST: string;
      DATABASE_PORT: string; 
      DATABASE_SYNC_FORCE: string;
    }
  }
}

export {}