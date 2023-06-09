import mongoose from "mongoose";

const makeReferralRewardDB = (referRewardModel: mongoose.Model<any>) => {
  return {
    create: async (data: ReferralRewardObject) => {
      const newData = new referRewardModel(data);
      const saveData = await newData.save();
      if (!saveData) {
        throw new Error("UserDB Database Error");
      }
      return saveData;
    },

    findOne: async ({ filter }: DataAccessParam) => {
      return referRewardModel.findOne(filter);
    },

    find: async ({ filter }: DataAccessParam) => {
      return referRewardModel.find(filter);
    },

    update: async ({ filter, update }: DataAccessParam) => {
      return referRewardModel.findOneAndUpdate(
        filter,
        update
      );
    },

    remove: async ({ filter }: DataAccessParam) => {
      const res: any = await referRewardModel.deleteOne(filter);
      return {
        found: res.n,
        deleted: res.deletedCount
      };
    }
  }
}

export { makeReferralRewardDB };