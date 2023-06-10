import { Response, Request } from "express";
import platformDatas from "../data-access";

const platfromController = {
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
  }
}

export default platfromController;
