const { Router } = require("express");
const algosController = require("../controllers/algorithmController");
const algosRouter = Router();
const path = require("node:path");
const multer = require('multer');
// Disabling Image Upload 
// const upload = multer({ dest: path.join(__dirname, '..', 'public', 'temp') });

algosRouter.get("/", algosController.getList);
algosRouter.post("/", algosController.getList);
algosRouter.get("/view/:id", algosController.getAlgorithm);
algosRouter.get("/new", algosController.addAlgorithm);
// Disabling Image upload
// algosRouter.post("/new", upload.single('image'), algosController.addAlgorithm);
algosRouter.post("/new", algosController.addAlgorithm);
algosRouter.get("/delete/:id", algosController.deleteAlgorithm);



module.exports = algosRouter;