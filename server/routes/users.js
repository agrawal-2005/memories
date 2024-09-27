import express from 'express'
import {getuser, signin, signup} from '../controllers/users.js'

const router = express.Router();

router.get('/', getuser)
router.post('/signin', signin);
router.post('/signup', signup);

export default router;