export default {
  async fetch(request, env, ctx) {
    const quotes = [
      "Iterate, Innovate, Improve.",
      "The most precious resource we have is time",
      "Be an innovator, not a spectator.",
      "Think Different",
      "Don't let the noise of others' opinions drown out your own inner voice.",
      "The sidelines are not where you want to live your life",
    ];
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];


    const RESEND_API_KEY = 're_12345678';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'resend@example.com',
        to: 'resend@example.com',
        subject: 'Good Morning ☀️',
        html: randomQuote
      })
    });
    
    const results = await gatherResponse(response);
    return new Response(results, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    /**
     * gatherResponse awaits and returns a response body as a string.
     * Use await gatherResponse(..) in an async function to get the response body
     * @param {Response} response
     */
    async function gatherResponse(response) {
      const { headers } = response;
      const contentType = headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        return JSON.stringify(await response.json());
      }
      return response.text();
    }
  },
};
