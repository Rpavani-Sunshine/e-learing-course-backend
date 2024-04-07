const CourseEnrollModel=require('../model/CourseEnrollModel');
const { sendCourseEnrollmentNotification } = require('../utils/EmailIntegrate');

module.exports.enroll__course__controller = async (req, res, next) => {
  try {
    const {courseId} = req.body;
    const enroll = await CourseEnrollModel.findOne({
      enrolledCourses: courseId,
    });
    if (enroll) {
      console.log(enroll)
        
    } else {
      const enroll_course=new CourseEnrollModel({
        userId: req.user._id,
        enrolledCourses: courseId
      })
    enroll_course.save()
    .then(result=>{
      // Get email and other necessary details from the result
      const email = result.userId.email; 
      const courseName = result.enrolledCourses.courseName 

      // Send course enrollment notification email
      sendCourseEnrollmentNotification(email, courseName)
        .then(() => {
          console.log('Course enrollment notification sent successfully');
        })
        .catch(error => {
          console.error('Error sending course enrollment notification:', error);
        });
      return res.status(200).json({
        text:"Course enrolled",
        result
      })
    })
    .catch(err=>{
      console.log(err)
    })
    }
  } catch (err) {
    console.log(err);
  }
};
