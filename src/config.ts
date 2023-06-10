import { config as dotenv } from 'dotenv';
dotenv()

export const config = {
  PORT: Number(process.env.PORT),
  DATABASE: process.env.DATABASE,
  JWT_SECRET: process.env.JWT_SECRET,
  CHAINID: Number(process.env.CHAINID),
  DEBUG: process.env.DEBUG === 'true' ? true : false,

  ADMINWALLET: process.env.ADMINWALLET,

  ipfs: {
    baseUrl: process.env.PFS_BASEURL,
    host: process.env.IPFS_HOST,
    port: process.env.IPFS_PORT,
    opt: process.env.IPFS_OPT,
  },
} 