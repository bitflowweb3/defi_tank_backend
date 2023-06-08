import userDatas from "../data-access";
import AuthServices from "./authServices";
import { recoverPersonalData } from "../../utils/blockchain";

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

	// check signature is invalid
	verifySignature: ({ sig, address }: VerifySignParams) => {
		const msg = "welcome " + address;
		const sigAddress = recoverPersonalData(msg, sig);

		return sigAddress !== address;
	}
}

export default userService