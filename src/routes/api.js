import express from "express";
import { index, test } from "../controllers/indexController";
import {
  create as userCreate,
  show as userShow
} from "../controllers/userController";
import {
  confirm as authConfirm,
  login as authLogin
} from "../controllers/authController";
import {
  create as locationCreate,
  show as locationShow,
  edit as locationEdit,
  remove as locationRemove,
  all as locationAll
} from "../controllers/locationController";

const router = express.Router();
var mongoose = require("mongoose");

// collection.findOne({}, console.log);
/* GET home page. */
router.get("/", index);
router.get("/test", test);

// Auth controller routes
router.get("/auth/confirm/:confirmationToken", authConfirm);
router.post("/auth/login", authLogin);

// User controller routes
router.post("/users/create", userCreate);
router.post("/users/show", userShow);

// Location controller routes
router.post("/locations/create", locationCreate);
router.get("/locations/:id", locationShow);
router.put("/locations/:id", locationEdit);
router.delete("/locations/:id", locationRemove);
router.get("/locations", locationAll);

export default router;
