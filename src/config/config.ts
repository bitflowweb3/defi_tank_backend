require("dotenv").config();

export const config = {
  PORT: Number(process.env.PORT),
  DATABASE: process.env.DATABASE,
  JWT_SECRET: process.env.JWT_SECRET,
  CHAINID: Number(process.env.CHAINID),
  DEBUG: process.env.DEBUG === 'true' ? true : false,
}