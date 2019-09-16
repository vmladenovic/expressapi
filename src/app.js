import apiRouter from "./routes/api";
import bodyParser from "body-parser";
import { configureJwt } from "./configs/jwt";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import express from "express";
import indexRouter from "./routes";
import logger from "morgan";
import passport from "passport";
import path from "path";
import cors from "cors";

// loading env variables
dotenvExpand(dotenv.config({ path: "./.env" }));
const app = express();

//enable cors
app.use(cors());

// view engine setup
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
// configure and initialize password
configureJwt(passport);

app.use(passport.initialize());
app.set("views", "./src/views");
app.set("view engine", "pug");
// serve static
app.use(express.static(path.join(__dirname, "../public")));
// load routes
app.use("/", indexRouter); // @TODO default router should be removed
app.use("/api/v1/", apiRouter); // import API routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
