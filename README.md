## Valentine "Will you be my Valentine?" page

This is a tiny, self‑contained website that you can send to someone as a link.  
It shows a cute card asking:

> "Will you be my Valentine?"

There are two buttons:
- **Yes** – big, glowing, and attractive.
- **No** – tries to run away when the cursor gets near it.

### How to open locally

1. Open the `index.html` file in any browser:
   - On macOS you can double‑click it in Finder, or
   - Right‑click and choose “Open With” → your browser (Chrome, Safari, etc.).

### Personalizing the name in the question

You can add a name in the URL with a `name` query parameter:

```text
file:///.../index.html?name=Alex
```

Or after you deploy it somewhere:

```text
https://your-domain.com/index.html?name=Alex
```

The word “you” in the title will change to that name.

### Deploying / sharing

You can host this static page on:
- GitHub Pages
- Vercel
- Netlify
- Any static hosting / your own server

Just upload the `index.html` file (and this `README.md` if you like).

