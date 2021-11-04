import sequelize from "../db.js";
import seq from "sequelize";

const { DataTypes } = seq;

const User = sequelize.define(
    'users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

export default User