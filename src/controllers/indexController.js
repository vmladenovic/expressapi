import {JWT} from "../constants/jwt";
import passport from 'passport';

export function index(req, res) {
	res.json({
		status: 'working...',
		message: 'Welcome to FileServer API v1'
	});
}

// @TODO - remove testing route
export const test = async (req, res, next) => {
	await passport.authenticate(JWT.authorization_name.AUTHORIZE, {session: false}, (err, user, info) => {
		if (err) {
			res.status(400).send({error: 'Authorization failed'});
		}
		if (info !== undefined) {
			res.status(400).send({error: info.message});
		} else {
			console.log("Everything is OK! User logged");
			res.status(200).send({success: true, user: user, message: "This is your protected resource!"});
		}
	})(req, res, next);
};