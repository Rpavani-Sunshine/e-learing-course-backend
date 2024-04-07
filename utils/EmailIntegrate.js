const axios = require('axios');

const API_KEY = 're_NLW2WMvf_HxFU8wfJmoA8rtanBaRAA9SW';

async function sendEmail(templateId, recipient, mergeVars = {}) {
    try {
        const response = await axios.post('https://api.resend.com/v1/send_email', {
            template_id: templateId,
            recipient,
            merge_vars: mergeVars,
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        console.log('Email sent successfully:', response.data);
        return true;
    } catch (error) {
        console.error('Error sending email:', error.response.data);
        return false;
    }
}


async function sendRegistrationConfirmationEmail(email, userName) {
    const templateId = 'REGISTRATION_CONFIRMATION_TEMPLATE_ID'; // Replace with your template ID
    const mergeVars = {
        userName: userName,
    };
     sendEmail(templateId, email, mergeVars);
}

async function sendCourseEnrollmentNotification(email, courseName) {
    const templateId = 'COURSE_ENROLLMENT_TEMPLATE_ID'; // Replace with your template ID
    const mergeVars = {
        courseName: courseName
    };
    sendEmail(templateId, email, mergeVars);
}

module.exports = {sendRegistrationConfirmationEmail, sendCourseEnrollmentNotification};
