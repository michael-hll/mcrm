import { DataTypes, Model, Sequelize } from "sequelize";

class User extends Model {
  declare id: bigint;
  declare name: string;
  declare password: string;
  declare email: string;
  declare phone: string;
  declare active: boolean;

  static initialize = (sequelize: Sequelize) => {
    User.init(
      {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: { 
                    args: [3, 20],
                    msg: "Name length should be between 3 and 20."
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: { 
                    args: [6, 128],
                    msg: "Password length should be between 3 and 20."
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Please enter an valid email address."
                }
            }
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 10],
                    msg: "Phone number length should be between 5 and 10."
                }
            }
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
      },
      {
        sequelize: sequelize,
        modelName: "user",
      }
    );
  };
}

export default User;
