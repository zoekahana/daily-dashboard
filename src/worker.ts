interface Env {
  API_NINJAS_KEY: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/quote') {
      const headers: Headers = new Headers();
      // Add a few headers
      headers.set('Content-Type', 'application/json');
      headers.set('X-Api-Key', env.API_NINJAS_KEY);

      const apiUrl = new URL('https://api.api-ninjas.com/v2/randomquotes');
      apiUrl.searchParams.set('exclude_categories', 'relationships,death');

      const requestInfo: RequestInfo = new Request(apiUrl, {
        method: 'GET',
        headers: headers
      })

      return fetch(requestInfo)
        .then(res => res.json())
        .then(res => {
          return Response.json(res);
        })
    }

    return new Response('Not found', { status: 404 });
  }
};
