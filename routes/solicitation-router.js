"use strict";

const express = require("express");
const router = express.Router();
const auth = require('../middlewares/authentication');
const controller = require('../controllers/solicitation-controller');

let _ctrl = new controller();

router.get("/",auth,_ctrl.get);

router.get("/:id",auth,_ctrl.getById);

router.post("/",auth,_ctrl.post);

router.put("/:id",auth,_ctrl.put);
router.delete("/:id",auth,_ctrl.delete);

module.exports = router;
