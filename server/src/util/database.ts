import { Sequelize } from "sequelize";
import path from "path";
import { env } from "process";
import dotenv from "dotenv";
import modelInitAll from "../models/model-init";

if (env.NODE_ENV === "production") {
  dotenv.config({ path: path.resolve("./dist", ".env") });
  //console.log("prod:", env);
} else {
  dotenv.config({ path: path.resolve("./.env") });
  //console.log("dev:", path.resolve("./.env"), env);
}

export const sequelize = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USER,
  env.DATABASE_PASSWORD,
  {
    host: env.DATABASE_HOST,
    port: +env.DATABASE_PORT, 
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
    define: {
      freezeTableName: true, 
    },
  }
);

modelInitAll(sequelize);

export const syncDb = async () => {
  try {
    for(let key in sequelize.models){
      if(key === 'role'){
        sequelize.models[key].sync();
      }else{
        sequelize.models[key].sync({force: true}); 
      }
    } 
    return true;
  } catch (err) {
    throw err;
  }
};
