import { Sequelize } from "sequelize-typescript";
import { dotEnv } from "../config/config";
import path from "path";

const sequelize = new Sequelize(dotEnv.databaseUrl ? dotEnv.databaseUrl : "", {
  dialect: "postgres",
  models: [path.resolve(__dirname, "models")], // this code goes to the models folder and imports any files or class that is exported which extends the Model class here the User class also extends the Model class
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
