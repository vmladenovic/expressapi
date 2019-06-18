import {confirm as authConfirm, login as authLogin} from '../controllers/authController';
import express from 'express';
import {index, test} from '../controllers/indexController';
import {create as userCreate, show as userShow} from '../controllers/userController';

const router = express.Router();

/* GET home page. */
router.get('/', index);
router.get('/test', test);

// Auth controller routes
router.get('/auth/confirm/:confirmationToken', authConfirm);
router.post('/auth/login', authLogin);

// User controller routes
router.post('/users/create', userCreate);
router.post('/users/show', userShow);

export default router;
