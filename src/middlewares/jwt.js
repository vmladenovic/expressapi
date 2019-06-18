import models from '../configs/mongoose';
import uuidv1 from 'uuid/v1';
import uuidv3 from 'uuid/v3';
import User from '../models/user';

/**
 * Authorize active (email confirmed) user
 * @param jwt_payload
 * @param done
 */
export const authorize = (jwt_payload, done) => {
	try {
		// find user to authorize
		User.findOne({
			id: jwt_payload.id
		}, (error, user) => {
			if (user) {
				// user has been fetched successfully
				done(null, user);
			} else {
				// requested user doesn't exist in DB
				done(null, false, {message: 'User not found'});
			}
		});

	} catch (err) {
		done(err);
	}
};

/**
 * Login user by username and password using JWT's local strategy
 * @param email
 * @param password
 * @param done
 */
export const login = (email, password, done) => {
	try {
		User.findOne({
			email: email,
		}, (error, user) => {
			if (error !== null) {
				return done(null, false, {
					message: 'Error while checking credentials.',
					error: err
				});
			}

			if (user === null) {
				return done(null, false, {message: 'Wrong email or password'});
			}

			// check password
			user.comparePassword(password, function (error, isMatch) {
				try {
					if (error) {
						throw error;
					}
					// on successful confirmation
					if (isMatch && user.active) {
						// password correct and account has been confirmed
						return done(null, user);
					} else if (user.active === false) {
						// password correct but the email hasn't been confirmed
						return done({message: 'Account activation pending'}, false);
					}

					// passwords confirmation failed
					return done(null, false, {message: 'Wrong email or password'});
				} catch (error) {
					return done(null, false, {message: error});
				}
			});
		});
	} catch (err) {
		done(err);
	}
};

/**
 * Register user with username and password. Used by JWT's local strategy
 * @param req
 * @param username
 * @param password
 * @param done
 * @returns *
 */
export const register = (req, username, password, done) => {
	try {
		User.findOne({
			$or: [
				{email: req.body.email},
				{username: req.body.username}
			]
		}, (err, user) => {
			if (err !== null) {
				console.log('Error', err);
				return done(null, false, {
					message: 'Error while checking credentials.',
					error: err
				});
			}
			if (user !== null) {
				return done(null, false, {
					error: 'Username or email already taken.'
				});
			}

			User.create({
				id: uuidv1(),
				username: req.body.username,
				email: req.body.email,
				password: req.body.password,
				active: false,
				activationToken: uuidv3(req.body.username, uuidv1(process.env.GROUPIVE_FILESERVER_URL))
			}, (err, user) => {
				if (err !== null) {
					// error has been detected
					return done(null, false, {
						message: err,
						error: err
					});
				}

				return done(null, user);
			});
		});
	} catch (err) {
		return done(err);
	}
};
