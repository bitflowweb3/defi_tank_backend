import AuthController from "./auth";

const userController = {
	// Auth controller
	signup: AuthController.signup,
	login: AuthController.login,
	middleware: AuthController.middleware,

}

export default userController;
