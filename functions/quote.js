export function onRequest() {
	return new Response(JSON.stringify([
		{
			"quote": "heyyyyy",
			"author": "zoe k",
			"work": "my brain",
			"categories": ["zoe", "kahana"]
		}
	]), {
		headers: { "content-type": "application/json" }
	});
}