const CourseModel = require("../model/CourseModel");
const cloudinary=require('../middlewares/cloudinary')

module.exports.postCourse__controller = async (req, res, next) => {
  try {
    const { courseDescription, courseName } = req.body;

    if (!courseDescription || !courseName) {
      return res.status(400).json({
        error: "Please Provide All Information",
      });
    }


    const course = new CourseModel({
      courseDescription,
      courseName,
      createdAt: req.user._id,
    });
    course
      .save()
      .then((result) => {
        return res.status(200).json({
          result,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          error: "Something went wrong",
        });
      });
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.getCourses__controller = async (req, res, next) => {
  try {
    let query = {};  

    // Filtering options based on request query parameters
    if (req.query.category) {
      query.category = req.query.category;
    }
    if (req.query.level) {
      query.level = req.query.level;
    }

    // Pagination options
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const courses = await CourseModel.find(query)
      .populate("createdAt", "role _id userName email")
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      courses,
      currentPage: page,
      totalPages: Math.ceil(courses.length / limit),
    });
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};


module.exports.getOneCourse__controller = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await CourseModel.findOne({ _id: courseId });
    return res.status(200).json({
      course,
    });
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};

module.exports.deleteCourse__Controller = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const course = await CourseModel.findOneAndDelete({ _id: courseId });
    return res.status(200).json({
      message : 'Course deleted successfully', course
    });
  } catch (err) {
    return res.status(400).json({
      error: "Something went wrong",
    });
  }
};
