import { supabase } from './supabaseClient.js';

chrome.runtime.onInstalled.addListener(() => {
  console.log('Background service worker running!');
});

async function loginWithGoogle() {
  const redirectUri = chrome.identity.getRedirectURL();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectUri,
      skipBrowserRedirect: true
    }
  });

  console.log('Supabase signInWithOAuth raw data:', JSON.stringify(data, null, 2));
  console.log('Supabase signInWithOAuth raw error:', JSON.stringify(error, null, 2));
  console.log('Chrome identity redirect URI:', redirectUri);

  if (!data || !data.url) {
    console.error('No authorization URL returned from Supabase.');
    console.error('Full data object:', data);
    console.error('Full error object:', error);
    return;
  }

  try {
    const redirectResult = await chrome.identity.launchWebAuthFlow({
      url: data.url,
      interactive: true
    });

    console.log('Redirect result URL:', redirectResult);

    const hashParams = new URLSearchParams(redirectResult.split('#')[1]);
    const access_token = hashParams.get('access_token');
    const refresh_token = hashParams.get('refresh_token');

    if (!access_token) {
      throw new Error('No access token in redirect URL');
    }

    const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token
    });

    if (sessionError) throw sessionError;

    chrome.storage.local.set({ session: sessionData.session });
    console.log('User logged in:', sessionData.session.user.email);

  } catch (err) {
    console.error('OAuth flow error:', err && err.message ? err.message : err);
    console.error('Full error object:', err);
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'login-google') loginWithGoogle();
});