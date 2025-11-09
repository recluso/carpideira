// functions/auth.js
export async function onRequest(context) {
  const { GITHUB_CLIENT_ID, BASE_URL } = context.env;
  
  // Set a secure, random state to prevent CSRF
  const state = Math.random().toString(36).substring(2, 15);
  
  const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
  githubAuthUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
  githubAuthUrl.searchParams.set('redirect_uri', `${BASE_URL}/api/callback`);
  githubAuthUrl.searchParams.set('scope', 'repo,user'); // Needed for Decap CMS to commit
  githubAuthUrl.searchParams.set('state', state);

  // Redirect to GitHub
  return Response.redirect(githubAuthUrl.toString(), 302);
}