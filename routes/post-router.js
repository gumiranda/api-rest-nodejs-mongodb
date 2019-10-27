"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/post-controller');
const auth = require('../middlewares/authentication');

let _ctrl = new controller();

router.get("/page/:page/lat/:lat/lng/:lng/maxdist/:maxdist",auth,_ctrl.getByPage);

router.get("/",auth,_ctrl.get);

router.get("/:id",auth,_ctrl.getById);

router.post("/",auth,_ctrl.post);

router.put("/:id",auth,_ctrl.put);
router.put("/like/:id",auth,_ctrl.like);
router.put("/unlike/:id",auth,_ctrl.unlike);
router.put("/comment/:id",auth,_ctrl.comment);
router.put("/uncomment/:id",auth,_ctrl.uncomment);
router.delete("/:id",auth,_ctrl.delete);

module.exports = router;
