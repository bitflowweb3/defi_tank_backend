import mongoose from "mongoose";

const makeUserDB = (UserModel: mongoose.Model<any>) => {
  return {
    create: async (data: UserDataObject) => {
      const newData = new UserModel(data);
      const saveData = await newData.save();
      if (!saveData) {
        throw new Error("UserDB Database Error");
      }
      return saveData;
    },

    findOne: async ({ filter }: { filter: any }) => {
      return UserModel.findOne(filter);
    },

    find: async ({ filter }: { filter: any }) => {
      return UserModel.find(filter);
    },

    update: async ({ filter, update }: { filter: any, update: any }) => {
      return UserModel.findOneAndUpdate(
        filter,
        update
      );
    },

    remove: async ({ filter }: { filter: any }) => {
      const res: any = await UserModel.deleteOne(filter);
      return {
        found: res.n,
        deleted: res.deletedCount
      };
    }
  }
}

export { makeUserDB };