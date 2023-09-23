import { Sequelize } from "sequelize";
import User from "./user";

const initializeAll = (sequelize: Sequelize) => {
    User.initialize(sequelize);
};

export default initializeAll;