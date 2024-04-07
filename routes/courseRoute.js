const { postCourse__controller, getCourses__controller, getOneCourse__controller, deleteCourse__Controller, } = require("../controllers/courseController");
const { adminAuthentication } = require("../middlewares/authentication");
const { requireLogin } = require("../middlewares/requireLogin");

const router = require("express").Router();

router.post(
    "/post-course",
    requireLogin,
    adminAuthentication,
    postCourse__controller
);

router.get("/get-courses", requireLogin, getCourses__controller);

router.get("/get-course/:courseId", requireLogin, getOneCourse__controller)

router.delete('/delete', requireLogin, adminAuthentication, deleteCourse__Controller)

module.exports = router;
