import { DataTypes, Model, Sequelize } from "sequelize";

class Role extends Model {
  declare id: bigint;
  declare name: string;
  declare description: string;

  static initialize = (sequelize: Sequelize) => {
    Role.init(
      {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true 
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: { 
                    args: [3, 20],
                    msg: "Name length should be between 3 and 20."
                }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
      },
      {
        sequelize: sequelize, 
        modelName: "role",
        timestamps: false
      }
    );
  };
}

export default Role;