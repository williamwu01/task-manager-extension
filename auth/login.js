// login.js
import { supabase } from './supabaseClient.js';

export async function loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
        redirectTo: 'https://godbbdgedoomfnpiagnpenkpldanecnm.chromiumapp.org/'
        }
    });

    if (error) console.error('Login error:', error.message);
    else console.log('Redirecting to Google login...');
    }

    export async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
    }

    export async function handleRedirect() {
    const { data: { session }, error } = await supabase.auth.getSessionFromUrl();
    if (session) {
        console.log('Logged in!', session.user.email);
        return session.user;
    }
    if (error) console.error(error);
}