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
  edit as locationShow
} from "../controllers/locationController";
import Location from "./../models/location";

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

router.get("/locations/:id", function(req, res, next) {
  const id = req.params.id;

  console.log(mongoose.Types.ObjectId.isValid(id));

  Location.findById(req.params.id)
    .then(location => {
      if (!location) {
        return res.status(404).end();
      }

      return res.status(200).json(location);
    })

    .catch(err => next(err));
});

export default router;
