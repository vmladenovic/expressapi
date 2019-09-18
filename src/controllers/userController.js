import { JWT } from "../constants/jwt";
import passport from "passport";

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Creates a new user
 *     description:
 *       "Registers a new user"
 *     tags:
 *       - Users
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/CreateUser'
 *     responses:
 *       200:
 *         description: OK!
 *         schema:
 *           type: object
 *           properties:
 *             auth:
 *               type: boolean
 *             user:
 *               $ref: '#/definitions/User'
 *       422:
 *         description: When username or email are already in use
 *         schema:
 *           type: object
 *           required:
 *             - auth
 *           properties:
 *             auth:
 *              type: boolean
 *             message:
 *               type: string
 *             error:
 *               type: string
 */
export const create = (req, res, next) => {
  passport.authenticate(JWT.authorization_name.AUTHORIZE, (err, user, info) => {
    if (err) {
      console.error(err);
    }
    if (info !== undefined) {
      res.status(422).send({ ...info, auth: false });
    } else {
      req.logIn(user, error => {
        res.status(200).send({
          auth: false,
          user: user
        });
      });
    }
  })(req, res, next);
};

/**
 * @swagger
 * /users/show:
 *   post:
 *     security: [{"jwt": []}]
 *     summary: Get logged user
 *     description:
 *       "Get user by JWT token"
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: OK!
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/definitions/User'
 *       422:
 *         description: When the username or email are already in use
 *         schema:
 *           type: object
 *           required:
 *             - auth
 *           properties:
 *             auth:
 *              type: boolean
 *             message:
 *               type: string
 *             error:
 *               type: string
 */
export const show = (req, res, next) => {
  passport.authenticate(
    JWT.authorization_name.AUTHORIZE,
    { session: false },
    (err, user, info) => {
      if (err) {
        return res.status(422).send({ error: "Authorization failed" });
      }

      if (info !== undefined) {
        return res.status(422).send({ error: info.message });
      } else {
        return res.status(200).send({ user: user });
      }
    }
  )(req, res, next);
};
