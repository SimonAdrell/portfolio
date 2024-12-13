import type { PageServerLoad, Actions } from './$types';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    default: async({ request }) => {
        console.log(request);
        const data = await request.formData();
        console.log(data);
        const email = data.get('email');
        console.log(email);
        
        return {success:true}
    }
} satisfies Actions