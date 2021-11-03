import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { Sequelize } from "sequelize";
import { Console } from "console";

const { readFile, writeFile } = fs;

export const dataFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../models"
);
console.log(dataFolderPath);

const tablesSQLPath = join(dataFolderPath, "tables.sql");
console.log(tablesSQLPath);

export const getTables = () => readFile(tablesSQLPath);
export const writeTables = (content) => writeFile(tablesSQLPath, content);

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  PGHOST,
  PGPORT,
  dialect: 'postgres'
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log("Can be established");
  } catch (error) {
    console.log(error);
  }
};

export const connectDB = async () => {
  try {
      await sequelize.sync();
      console.log("Connected and tables created");
  } catch (error) {
    console.log(error);
  }
};

export default sequelize;
