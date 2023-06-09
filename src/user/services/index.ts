import userDatas from "../data-access";
import AuthServices from "./authServices";
import { recoverPersonalData } from "../../utils/blockchain";
import { getUTCTime } from "../../utils";

interface VerifySignParams {
	sig: string
	address: string
}

const userService = {
	// auth service
	createToken: AuthServices.createToken,
	verifyToken: AuthServices.verifyToken,

	// check exist account
	checkExistOfAccount: async ({ name, email, address }) => {
		let existsAddress = await userDatas.UserDB.findOne({
			filter: { address: address }
		});

		if (!!existsAddress) {
			return {
				res: true,
				param: "address",
				msg: "address is Exist"
			}
		}

		let existsName = await userDatas.UserDB.findOne({
			filter: { name: name }
		});

		if (!!existsName) {
			return {
				res: true,
				param: "name",
				msg: "name is Exist"
			}
		}

		let existsEmail = await userDatas.UserDB.findOne({
			filter: { email: email }
		});

		if (!!existsEmail) {
			return {
				res: true,
				param: "email",
				msg: "email is Exist"
			}
		}

		return {
			res: false,
			param: "none",
			msg: "true"
		}
	},

	// check update account
	checkUpdateAccount: async ({ name, email, address }) => {
		let existsName = await userDatas.UserDB.findOne({
			filter: {
				$and: [
					{ name: name },
					{ address: { $ne: address } },
				]
			}
		})

		if (!!existsName) {
			return {
				res: true,
				param: "name",
				msg: "name is Exist"
			}
		}

		let existsEmail = await userDatas.UserDB.findOne({
			filter: {
				$and: [
					{ email: email },
					{ address: { $ne: address } },
				]
			}
		})

		if (!!existsEmail) {
			return {
				res: true,
				param: "email",
				msg: "email is Exist"
			}
		}

		return {
			res: false,
			param: "none",
			msg: "true"
		}
	},

	// check signature is invalid
	verifySignature: ({ sig, address }: VerifySignParams) => {
		const msg = "welcome " + address;
		const sigAddress = recoverPersonalData(msg, sig);

		return sigAddress !== address;
	},

	// update borrow time
	updateBorrowTime: async (address: string) => {
		let user = await userDatas.UserDB.findOne({
			filter: { address: address }
		})

		if (user) {
			let startDayTime = getUTCTime()

			if (!user.borrowTime || user.borrowTime < startDayTime) {
				await userDatas.UserDB.findOne({
					filter: { address: address },
					update: { borrowCount: 0 }
				})

				return 0
			}

			return user.borrowCount
		} else {
			throw new Error("updateBorrowTime: user data isn't exist")
		}
	}
}

export default userService