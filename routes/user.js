const express = require("express")
const router = express.Router();

const userCtrl = require("../controllers/users")

router.get("/all",userCtrl.getUserList)
router.post("/add",userCtrl.addUser)
router.get("/:id",userCtrl.getUserById)
router.put("/:id",userCtrl.updateUser)
router.delete("/:id",userCtrl.deleteUser)

module.exports = router;