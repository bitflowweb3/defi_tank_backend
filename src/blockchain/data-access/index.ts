import BlockchainModels from "../models";
import { makeNftTankDB } from "./nftTank";
import { makeClassesDB } from "./classes";
import { makeNotifiDB } from "./notification";
import { makeTxHistoryDB } from "./txHistory";
import { makeBlockNumDB } from "./blockNumber";
import { makeAdminSetDB } from "./adminSetting";
import { makeReferralRewardDB } from "./referralReward";

const BlockNumDB = makeBlockNumDB(BlockchainModels.BlockNumber)
const ReferRewardDB = makeReferralRewardDB(BlockchainModels.ReferralReward)
const NftTankDB = makeNftTankDB(BlockchainModels.NFTTank)
const ClassesDB = makeClassesDB(BlockchainModels.Classes)
const TxHistoryDB = makeTxHistoryDB(BlockchainModels.TxHistory)
const AdminSetDB = makeAdminSetDB(BlockchainModels.AdminSetting)
const NotifiDB = makeNotifiDB(BlockchainModels.Notification)

const blockchainDatas = {
  BlockNumDB,
  ReferRewardDB,
  NftTankDB,
  ClassesDB,
  TxHistoryDB,
  AdminSetDB,
  NotifiDB,
}

export default blockchainDatas;