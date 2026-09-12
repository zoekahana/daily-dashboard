export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/quote') {
      return Response.json([
        {
          quote: 'heyyyyy',
          author: 'zoe k',
          work: 'my brain',
          categories: ['zoe', 'kahana'],
        },
      ]);
    }

    return new Response('Not found', { status: 404 });
  },
};
