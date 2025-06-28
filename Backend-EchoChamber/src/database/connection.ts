import { Sequelize } from "sequelize-typescript";
import { dotEnv } from "../config/config";

const sequelize = new Sequelize(dotEnv.databaseUrl ? dotEnv.databaseUrl : "", {
  dialect: "postgres",
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

export default sequelize;
