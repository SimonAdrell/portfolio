import { env } from '$env/dynamic/private';
import { Client } from '@notionhq/client';

export async function AddNotionRowToDb(firstNameValue: string, lastNameValue: string, emailValue: string, messageValue: string) {
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
