const express = require("express")
const router = express.Router();

const courseCtrl = require("../controllers/courses")

router.get("/all",courseCtrl.getCourseList)
router.post("/add",courseCtrl.addCourse)
router.post("/content/add",courseCtrl.addContent )
router.get("/content/all",courseCtrl.getContents)
router.get("/:id",courseCtrl.getCourseById)
router.put("/:id",courseCtrl.updateCourse)
router.delete("/:id",courseCtrl.deleteCourse)

module.exports = router;