import express from 'express';
import {spec} from '../configs/swaggerJsDocs';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec));

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', {title: 'File Server'});
});

export default router;
