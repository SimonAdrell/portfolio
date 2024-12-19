import type { PageServerLoad, Actions } from './$types';
import { env } from '$env/dynamic/private';
import { Client } from '@notionhq/client';
import MailService from '@sendgrid/mail/src/mail';
export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const emailValue = <string>data.get('email');
        const firstNameValue = <string>data.get('firstName');
        const lastNameValue = <string>data.get('lastName');
        const messageValue = <string>data.get('message');
        let success = true;
        await
            addNotionRow(firstNameValue, lastNameValue, emailValue, messageValue)
                .then(() => sendEmail(emailValue, firstNameValue, lastNameValue, messageValue))
                .catch(() => {
                    success = false;
                });

        return { success: success };
    }
} satisfies Actions

const sendEmail = async (emailValue: string, firstNameValue: string, lastNameValue: string, messageValue: string) => {
    MailService.setApiKey(env.SENDGRID_API_KEY);
    await MailService
        .send({
            from: { email: 'Simon@CodeBySimon.com', name: 'Simon Adrell' },
            bcc: 'Simon@CodeBySimon.com',
            templateId: env.SENDGRID_TEMPLATE_ID,
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

const addNotionRow = async (firstNameValue: string, lastNameValue: string, emailValue: string, messageValue: string) => {
    const notion = new Client({ auth: env.NOTION_API_KEY });
    await (async () => {
        await notion.pages.create({
            parent: {
                database_id: env.NOTION_LEADS_DB_ID,
            },
            properties: {
                'Name': {
                    type: 'title',
                    title: [
                        {
                            type: 'text',
                            text: {
                                content: firstNameValue + ' ' + lastNameValue,
                            },
                        },
                    ],
                },
                'Lead Source': {
                    type: 'select',
                    select: {
                        name: 'CodeBySimon.com',
                    }
                },
                'Contact Email': {
                    type: 'email',
                    email: emailValue
                }
            },
            children: [
                {
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {
                        "rich_text": [
                            {
                                "type": "text", "text": { "content": messageValue }
                            }
                        ]
                    }
                }
            ]
        })
            .then(() => {
                console.log('Row added to notion');
            })
            .catch((error) => {
                console.error(error);
                console.log('error:', error.response.body.errors);
                throw new Error("Could not add notion row");
            });
    })();
}