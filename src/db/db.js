import { Sequelize } from "sequelize";


const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  PGHOST,
  PGPORT,
  dialect: 'postgres'
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("Authenticated 🟢 🟢");
  } catch (error) {
    console.log(error);
  }
};

export const connectDB = async () => {
  try {
      await sequelize.sync({ logging: false });
      console.log("Connected and tables created 🟢 🟢 🟢");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
