import { Sequelize } from "sequelize-typescript";
import { dotEnv } from "../config/config";
import path from "path";

const sequelize = new Sequelize({
  database: dotEnv.dbName, // the name of the database
  username: dotEnv.dbUserName, // database to username root by default
  password: dotEnv.dbPassword, //the password is empty by default
  host: dotEnv.dbHost, //where is te database hosted now it is locally hosted on the localhost
  dialect: "mysql", // which database is being used
  port: Number(dotEnv.dbPort), // the default port number for the mysql database 3306
  models: [__dirname + "/models"], // this code goes to the models folder and imports any files or class that is exported which extends the Model class here the User class also extends the Model class
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Dababase connected to supabase");
  } catch (e) {
    console.error("Database Connection faile:", e);
  }
};

connectDB();

async function Migrate() {
  try {
    await sequelize.sync({ alter: false });
    console.log("The migration was successfull");
  } catch (e) {
    console.log("Error in the migration", e);
  }
}

Migrate();

export default sequelize;
