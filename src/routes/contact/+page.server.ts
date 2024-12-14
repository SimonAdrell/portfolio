import type { PageServerLoad, Actions } from './$types';
import { AddNotionRowToDb } from './AddNotionRowToDb';
import { SendEmail } from './SendEmail';
export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async ({ request }) => {
        console.log(request);
        const data = await request.formData();
        console.log(data)
        const emailValue = <string>data.get('email');
        const firstNameValue = <string>data.get('firstName');
        const lastNameValue = <string>data.get('lastName');
        const messageValue = <string>data.get('message');
        let success = true;
        await
            AddNotionRowToDb(firstNameValue, lastNameValue, emailValue, messageValue)
                .then(() => SendEmail(emailValue, firstNameValue, lastNameValue, messageValue))
                .catch(() => {
                    success = false;
                });

        return { success: success };
    }
} satisfies Actions
