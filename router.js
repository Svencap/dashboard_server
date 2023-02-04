import { Router } from "express";
import Controller from "./controller.js";

const controller = new Controller();
const router = new Router();

// router.get('/users', controller.getUsers);

router.post('/users', controller.getUsers);

router.post('/googleAuth', controller.googleAuth);

router.post('/login', controller.login);


router.post('/signup', controller.singUp);

export default router;  