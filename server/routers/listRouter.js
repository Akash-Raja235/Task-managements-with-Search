

import {Router} from 'express'
import {CreateList, getAllList, deleteList,getSearchByname,getAllListByIds,updateById} from "../controllers/listControllers.js"



const router = Router()


router.post("/create", CreateList);
router.get("/get-all-lists", getAllList);
router.delete("/delete/:ids", deleteList);
router.get("/search/:name", getSearchByname);
router.get("/getbyid/:ids", getAllListByIds,);
router.put("/update", updateById,);







export default router