"use strict";

const express = require("express");
const router = express.Router();
const controller = require('../controllers/usuario-controller');
const auth = require('../middlewares/authentication');
let _ctrl = new controller();

router.post('/autenticar',_ctrl.autenticar);
router.post('/register',_ctrl.post);

router.get("/",auth,_ctrl.get);

router.get("/:id",auth,_ctrl.getById);
router.post("/coordinate/oi",auth,_ctrl.getByCoordinate);
router.post("/",auth,_ctrl.post);
router.put("/follow/:id",auth,_ctrl.follow);
router.put("/unfollow/:id",auth,_ctrl.unfollow);
router.put("/:id",auth,_ctrl.put);
router.delete("/:id",auth,_ctrl.delete);

module.exports = router;
