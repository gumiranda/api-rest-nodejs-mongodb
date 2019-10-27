"use strict";

const express = require("express");
const router = express.Router();
const auth = require('../middlewares/authentication');
const controller = require('../controllers/photo-controller');
const multer = require('multer');
const multerConfig = require('../bin/configuration/multer');
let _ctrl = new controller();

router.get("/:id",auth,_ctrl.getById);
router.post("/",auth,multer(multerConfig).single('file'),_ctrl.postPhoto);
router.put("/:id",auth,_ctrl.put);
router.delete("/:id",auth,_ctrl.delete);

module.exports = router;
