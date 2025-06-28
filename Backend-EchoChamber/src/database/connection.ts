import { Sequelize } from "sequelize-typescript";
import { dotEnv } from "../config/config";
import path from "path";

const sequelize = new Sequelize(dotEnv.databaseUrl ? dotEnv.databaseUrl : "", {
  dialect: "postgres",
  models: [path.resolve(__dirname, "models")],
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
    await sequelize.sync({ alter: true });
    console.log("The migration was successfull");
  } catch (e) {
    console.log("Error in the migration", e);
  }
}

Migrate();

export default sequelize;
