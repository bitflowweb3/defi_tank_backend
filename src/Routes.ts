import express from "express";
import User from "./user";

const Routes = async (router: express.Router) => {
	//user auth apis
	router.post("/auth/sinup", User.controllers.signup);
	router.post("/auth/login", User.controllers.login);

};

export { Routes };