import { Sequelize } from "sequelize";
import User from "./user";
import Role from "./role";

const initializeAll = (sequelize: Sequelize) => {
    User.initialize(sequelize);
    Role.initialize(sequelize); 
};

export default initializeAll; 