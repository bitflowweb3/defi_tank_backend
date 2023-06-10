import { ethers } from "ethers";
import { provider } from "./providers";
import { config } from "../../config";

const AdminWallet = new ethers.Wallet(config.ADMINWALLET, provider);

export { AdminWallet }
