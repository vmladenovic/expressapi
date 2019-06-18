import {authorize, login, register} from "../middlewares/jwt";
import {JWT} from '../constants/jwt';
import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';

export function  configureJwt() {
	const extractJwt = passportJWT.ExtractJwt;
	const JwtStrategy = passportJWT.Strategy;
	const LocalStrategy = passportLocal.Strategy;
	const secret = process.env.GROUPIVE_SESSION_SECRET;

	/**
	 * Active user authorization strategy
	 */
	passport.use(
		JWT.authorization_name.AUTHORIZE,
		new JwtStrategy(
			{
				secretOrKey: process.env.GROUPIVE_SESSION_SECRET,
				jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
			},
			authorize
		),
	);

	/**
	 * User login strategy
	 */
	passport.use(
		JWT.authorization_name.LOGIN,
		new LocalStrategy(
			{
				usernameField: 'email',
				passwordField: 'password',
				session: false,
			},
			login
		),
	);

	/**
	 * User registration strategy
	 */
	passport.use(
		JWT.authorization_name.REGISTER,
		new LocalStrategy(
			{
				usernameField: 'username',
				passwordField: 'password',
				passReqToCallback: true,
				session: false,
			},
			register
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});
}



