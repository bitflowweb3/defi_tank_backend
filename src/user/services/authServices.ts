import jwt from "jsonwebtoken";
import { config } from "../../config";

interface CreateTokenParams {
  name: string
  email: string
  address: string
}

const AuthServices = {
  createToken: (data: CreateTokenParams): string => {
    try {
      const token = jwt.sign(data, config.JWT_SECRET, {
        expiresIn: "144h",
      })

      return token
    } catch (err) {
      throw new Error(err.message);
    }
  },

  verifyToken: async (token: string): Promise<UserAuthObject> => {
    try {
      return jwt.verify(token, config.JWT_SECRET) as UserAuthObject
    } catch (err) {
      throw new Error(`Could not verify token: ${err.message}`);
    }
  }
}

export default AuthServices