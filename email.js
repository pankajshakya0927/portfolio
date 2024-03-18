const USER_ID = process.env.EMAILJS_USER_ID;
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;

// Initialize EmailJS with your user ID
emailjs.init(USER_ID);

// Function to send email
function sendEmail() {
    // Get field values from the form
    var fromName = document.getElementById('fullname').value;
    var fromEmail = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (fromName && fromEmail && message) {
        const emailParams = {
            to_email: 'dev.pankajshakya@gmail.com',
            to_name: 'Pankaj Shakya',
            from_name: fromName,
            from_email: fromEmail,
            message: message
        };

        // Send email using EmailJS
        emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams)
            .then(function (response) {
                console.log('Email sent successfully:', response);
                // Reset the form or show a success message
            }, function (error) {
                console.error('Error sending email:', error);
                // Show an error message to the user
            });
    }

}