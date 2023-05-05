import express from "express";
import {createBookForm,create,findOne,findAll} from "../controller/BookController.js"
const router = express.Router();

router.get('/catalog', findAll)
router.get('/book', findOne)
router.get('/newbookform', createBookForm)
router.post('/newbook', create)


export default router;