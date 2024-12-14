import { SENDGRID_API_KEY, SENDGRID_TEMPLATE_ID } from '$env/static/private';
import MailService from '@sendgrid/mail/src/mail';

export async function SendEmail(emailValue: string, firstNameValue: string, lastNameValue: string, messageValue: string) {
    MailService.setApiKey(SENDGRID_API_KEY);
    await MailService
        .send({
            from: { email: 'Simon@CodeBySimon.com', name: 'Simon Adrell' },
            bcc: 'Simon@CodeBySimon.com',
            templateId: SENDGRID_TEMPLATE_ID,
            personalizations: [
                {
                    to: { email: emailValue, name: firstNameValue + ' ' + lastNameValue },
                    dynamicTemplateData: {
                        "message": messageValue,
                        "first_name": firstNameValue + ' ' + lastNameValue
                    }
                },
                {
                    to: { email: 'simon@codebysimon.com', name: 'Simon Adrell' },
                    dynamicTemplateData: {
                        "message": messageValue,
                        "first_name": firstNameValue + ' ' + lastNameValue
                    }
                }
            ]
        })
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
            console.log('error:', error.response.body.errors);
            throw new Error("Mail could not be sent");

        });
}
