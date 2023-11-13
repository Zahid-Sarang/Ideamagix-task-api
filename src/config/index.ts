import { config } from "dotenv";
import path from "path";
config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV || "dev"}`),
});

const { PORT, NODE_ENV, DB_URL } = process.env;

export const Config = {
  PORT,
  NODE_ENV,
  DB_URL,
};
export { DB_URL };
