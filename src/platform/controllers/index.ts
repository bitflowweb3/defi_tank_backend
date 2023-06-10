import { Response, Request } from "express";
import platformDatas from "../data-access";
import blockchainService from "../../blockchain/services";
import userDatas from "../../user/data-access";
import userService from "../../user/services";
import platfromService from "../services";

const platfromController = {
  // notification apis
  getAlert: async (req: any, res: Response) => {
    try {
      const { user } = req.body;
      const result = await platformDatas.NotifiDB.find({
        filter: { user, status: "pending" }
      })

      return res.json(result)
    } catch (err) {
      console.log("Auth/claimReward : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  readAlert: async (req: any, res: Response) => {
    try {
      const { id } = req.body;

      const result = await platformDatas.NotifiDB.update({
        filter: { _id: id },
        update: { status: "read" }
      })

      return res.json(result);
    } catch (err) {
      console.log("Auth/claimReward : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  // tanks apis
  getTankClasses: async (req: any, res: Response) => {
    try {
      var classes = await platformDatas.ClassesDB.find({
        filter: {}
      })

      res.status(200).json({ status: true, data: classes });
    } catch (err) {
      console.error("gameApi/getAlltanks : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getAlltanks: async (req: any, res: Response) => {
    try {
      let tanks = await platformDatas.NftTankDB.find({
        filter: {}
      })

      res.status(200).json({ status: true, data: tanks });
    } catch (err) {
      console.error("gameApi/getAlltanks : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getUsertanks: async (req: any, res: Response) => {
    try {
      const { userAddress } = req.body;
      const tempAddr = String(userAddress).toUpperCase()

      const tanks = await platformDatas.NftTankDB.find({
        filter: { owner: tempAddr }
      })

      res.status(200).json({ status: true, data: tanks });
    } catch (err) {
      console.error("gameApi/getAlltanks : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getTanks: async (req: any, res: Response) => {
    try {
      const { ids } = req.body;

      const tanks = await platformDatas.NftTankDB.find({
        filter: { id: { $in: ids } }
      })

      res.status(200).json({ status: true, data: tanks });
    } catch (err) {
      console.error("gameApi/getTanks : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  getUpgradeSign: async (req: any, res: Response) => {
    try {
      const { id } = req.body;

      // const { availableLevel, signature } = updateInfo
      const updateInfo = await platformDatas.NftTankDB.getUpgradeSign({
        filter: { id: id }
      });

      res.status(200).json({ status: true, data: updateInfo })
    } catch (err) {
      console.error("gameApi/getUpgradeSign : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  updateName: async (req: any, res: Response) => {
    try {
      const { id, newName, newDescription, signature } = req.body;
      const address = await blockchainService.getAddrFromSig(id, signature)

      const tank = await platformDatas.NftTankDB.findOne({
        filter: { id: id }
      })

      if (!tank) {
        throw new Error("invalid tank id");
      }

      if (tank.owner.toUpperCase() != address.toUpperCase()) {
        throw new Error("Permission Denied!")
      }

      const checkName = await platformDatas.NftTankDB.findOne({
        filter: { name: newName }
      })

      if (checkName && checkName.id != tank.id) {
        throw new Error("Name is exist")
      }

      await platformDatas.NftTankDB.update({
        filter: { id: id },
        update: {
          name: newName,
          description: newDescription
        }
      })

      const resData = await platformDatas.NftTankDB.findOne({
        filter: { id: id }
      })

      res.status(200).json({ status: true, data: resData });
    } catch (err) {
      console.error("gameApi/getUpgradeSign : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  borrow: async (req: any, res: Response) => {
    try {
      const { id, signature } = req.body;
      const address = await blockchainService.getAddrFromSig(id, signature)
      const tank = await platformDatas.NftTankDB.findOne({
        filter: { id: id }
      })

      if (address.toUpperCase() != tank.owner.toUpperCase()) {
        // user action - return borrowed tanks
        if (!tank || tank.borrower != "") {
          throw new Error("invalid tank id");
        }

        await userService.newBorrow(address)

        let borrowTanks = await platformDatas.NftTankDB.find({
          filter: {
            owner: { $ne: address.toUpperCase() },
            borrower: address.toUpperCase()
          }
        })

        borrowTanks.map((tank) => {
          platformDatas.NftTankDB.update({
            filter: { id: tank.id },
            update: { borrower: "" }
          })
        })
      }

      await platformDatas.NftTankDB.update({
        filter: { id: tank.id },
        update: { borrower: address.toUpperCase() }
      })

      const resData = await platformDatas.NftTankDB.findOne({
        filter: { id: id }
      })

      res.status(200).json({ status: true, data: resData });
    } catch (err) {
      console.error("gameApi/borrow : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  lend: async (req: any, res: Response) => {
    try {
      const { id, to, signature } = req.body;
      const lendAddr = to ? to.toUpperCase() : ""
      const address = await blockchainService.getAddrFromSig(id, signature)

      const tank = await platformDatas.NftTankDB.findOne({
        filter: { id: id }
      })

      if (!tank) {
        throw new Error("invalid tank id");
      }
      // only owner or borrower
      if (tank.borrower.toUpperCase() != address.toUpperCase() && tank.owner.toUpperCase() != address.toUpperCase()) {
        throw new Error("Permission denied");
      }


      await platformDatas.NftTankDB.update({
        filter: { id: id },
        update: { borrower: lendAddr }
      })

      const resData = await platformDatas.NftTankDB.findOne({
        filter: { id: id }
      })

      res.status(200).json({ status: true, data: resData });
    } catch (err) {
      console.error("gameApi/lend : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  like: async (req: any, res: Response) => {
    try {
      const { id, signature } = req.body;
      const address = await blockchainService.getAddrFromSig(id, signature)

      let tank = await platformDatas.NftTankDB.findOne({
        filter: { id: id }
      })

      if (!tank) {
        throw new Error("invalid tank id");
      }

      let followerIndex = tank.followers.findIndex((follower: string) => (
        follower == address.toUpperCase()
      ))

      console.log("followerIndex", followerIndex);

      if (followerIndex != -1) {
        tank.followers.splice(followerIndex, 1); // unlike
      } else {
        tank.followers = [...tank.followers, address.toUpperCase()]; // like
      }

      await platformDatas.NftTankDB.update({
        filter: { id: id },
        update: { followers: tank.followers }
      });

      const resData = await platformDatas.NftTankDB.findOne({
        filter: { id: id }
      })

      res.status(200).json({ status: true, data: resData });
    } catch (err) {
      console.error("gameApi/getUpgradeSign : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },

  updateLevel: async (req: any, res: Response) => {
    try {
      const { id } = req.body;
      await platfromService.updateTankLevel(id)

      res.status(200).json({ status: true, data: true });
    } catch (err) {
      console.error("gameApi/getUpgradeSign : ", err.message);
      res.status(500).json({ error: err.message });
    }
  },
}

export default platfromController;
