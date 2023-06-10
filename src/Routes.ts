import express from "express";

import User from "./user";
import Platform from "./platform";

const Routes = async (router: express.Router) => {
	//user auth apis
	router.post("/auth/sinup", User.controllers.signup);
	router.post("/auth/login", User.controllers.login);

	// user apis
	router.post("/user/update-userdata", User.controllers.updateUserData);
	router.post("/user/check-userdata", User.controllers.checkUserData);
	router.post("/user/get-userdata", User.controllers.getUserData);
	router.post("/user/get-alldata", User.controllers.getAllUserData);
	router.post("/user/get-referrals", User.controllers.getReferrals);
	router.post("/user/get-referrerdata", User.controllers.getReferrerInfo);
	router.post("/user/like", User.controllers.like);
	router.post("/user/claim-reward", User.controllers.claimReward);

	// notification apis
	router.post("/user/get-alert", Platform.controllers.getAlert);
	router.post("/auth/read-alert", Platform.controllers.readAlert);
};

export { Routes };