// functions/callback.js
export async function onRequest(context) {
  const { BASE_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = context.env;
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('No code provided', { status: 400 });
  }

  // 1. Exchange the code for an access token
  const tokenUrl = 'https://github.com/login/oauth/access_token';
  const data = {
    client_id: GITHUB_CLIENT_ID,
    client_secret: GITHUB_CLIENT_SECRET,
    code: code,
    redirect_uri: `${BASE_URL}/api/callback`
  };

  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  const tokenData = await tokenResponse.json();
  const token = tokenData.access_token;
  
  if (!token) {
    return new Response('Failed to get access token', { status: 500 });
  }

  // 2. Pass the token back to Decap CMS using postMessage
  // The Decap CMS window (opener) is listening for this
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Authorization</title>
      </head>
      <body>
        <script>
          // Token is passed back to the CMS window (the opener)
          window.opener.postMessage(
            { 
              token: '${token}', 
              provider: 'github' 
            }, 
            '${BASE_URL}' 
          );
          window.close();
        </script>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}