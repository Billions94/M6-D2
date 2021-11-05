import { Sequelize } from "sequelize";


const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT, NODE_ENV } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host:PGHOST,
  port:PGPORT,
  dialect: 'postgres',
  ...(NODE_ENV === 'production' && {
    dialectOptions: {         // IMPORTANT
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  })
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
      console.log("Connected and tables created 🟢 🟢 🟢 ");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
