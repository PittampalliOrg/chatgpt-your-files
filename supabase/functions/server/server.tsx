/** @jsx jsx */
import OpenAI from "https://deno.land/x/openai@v4.20.1/mod.ts";
import { Hono } from "https://deno.land/x/hono@v3.11.6/mod.ts";
import {
  getCookie,
  setCookie,
} from "https://deno.land/x/hono@v3.11.6/helper.ts";
import { jsx } from "https://deno.land/x/hono@v3.11.6/jsx/index.ts";

// Create OpenAI API client and Hono app
const client = new OpenAI();
const app = new Hono();

// Render the last requested OpenAI image URL, if present in a cookie
app.get("/", (c) => {
  const imageUrl = getCookie(c, "dalle3_url");
  const lastPrompt = getCookie(c, "dalle3_last_prompt");

  const imgOrPrompt = imageUrl
    ? <img src={imageUrl} width="100%" />
    : <p>Enter a prompt to generate your first image!</p>;

  // Tiny bit of JS to make UX a (very little) bit nicer
  const script = `
    const b = document.querySelector("button");
    b.disabled = true;
    b.innerHTML = "Generating image, please wait...";
  `;

  return c.html(
    <html>
      <body style={{ maxWidth: "540px", margin: "10px auto" }}>
        <h1>DALL-E 3 Image Generator</h1>
        <form method="POST" action="/generate" onsubmit={script}>
          <textarea
            name="prompt"
            placeholder="Describe an image..."
            style={{ width: "100%", display: "block", marginBottom: "10px" }}
          >
            {lastPrompt}
          </textarea>
          <button type="submit">Generate Image</button>
        </form>
        {imgOrPrompt}
      </body>
    </html>,
  );
});

// Make an OpenAI API request to generate an image
app.post("/generate", async (c) => {
  const body = await c.req.parseBody();
  const p = String(body.prompt);

  try {
    const imagesResponse = await client.images.generate({
      model: "dall-e-3",
      prompt: p,
      n: 1,
      size: "1024x1024",
    });

    setCookie(c, "dalle3_url", imagesResponse?.data[0]?.url || "");
    setCookie(c, "dalle3_last_prompt", p);
    return c.redirect("/");
  } catch (e) {
    console.error(e);
    return c.text("Error during image creation: " + e.message);
  }
});

Deno.serve(app.fetch);