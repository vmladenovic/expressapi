import {JWT} from '../constants/jwt';
import passport from 'passport';
import User from '../models/user';
import * as jwtService from "jsonwebtoken";

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in the user
 *     description:
 *       "Log in the user"
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: OK!
 *         schema:
 *           type: object
 *           required:
 *             - auth
 *             - token
 *             - user
 *           properties:
 *             auth:
 *               type: boolean
 *             token:
 *               type: string
 *             user:
 *               $ref: '#/definitions/User'
 *       401:
 *         description: Account not confirmed
 *         schema:
 *           type: object
 *           required:
 *             - auth
 *             - message
 *           properties:
 *             auth:
 *               type: boolean
 *             message:
 *               type: string
 *       422:
 *         description: Bad credentials
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
export const login = (req, res, next) => {
	passport.authenticate(JWT.authorization_name.LOGIN, (error, user, info) => {
		if (error) {
			return res.status(401).send({...error, auth: false});
		}
		if (info !== undefined) {
			return res.status(422).send({...info, auth: false});
		} else {
			return req.logIn(user, (error) => {
				res.status(200).send({
					auth: true,
					token: jwtService.sign({id: user.id}, process.env.GROUPIVE_SESSION_SECRET),
					user: user
				});
			});
		}
	})(req, res, next);
};

/**
 * @swagger
 * /auth/confirm/{token}:
 *   get:
 *     summary: Confirm user account
 *     description:
 *       "Confirm and activate user account"
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           required: true
 *           description: User account activation token
 *     responses:
 *       200:
 *         description: OK!
 *         schema:
 *           type: object
 *           required:
 *             - auth
 *             - token
 *             - user
 *           properties:
 *             auth:
 *               type: boolean
 *             token:
 *               type: string
 *             user:
 *               $ref: '#/definitions/User'
 *       422:
 *         description: Bad token
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
 *       500:
 *         description: Error getting/updating the user
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

export const confirm = async (req, res) => {
	try {
		const confirmationToken = req.params.confirmationToken;
		const user = await User.confirmToken(confirmationToken);
		if (user !== null) {
			return req.logIn(user, (error) => {
				// log in activated user automatically
				res.status(200).send({
					auth: true,
					token: jwtService.sign({id: user.id}, process.env.GROUPIVE_SESSION_SECRET),
					user: user
				});
			});
		}

		res.status(422).send({auth: false, message: 'Invalid token'});
	} catch (error) {
		res.status(500).send({auth:false, error: error});
	}
};
