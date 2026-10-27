# Captured by Caleb Carter

Sports photography portfolio and blog (Sideline Notes), hosted on Netlify.

## Writing a post

**From the site:** go to `/admin`, log in with GitHub, click **New Post**, fill in the title, date written, type, and post, then **Publish**. The live site updates in about a minute.

**By adding a file:** create `posts/YYYY-MM-DD-short-title.json`:

```json
{
  "title": "Post title",
  "date": "2026-10-28",
  "category": "Student's choice",
  "cover": "/img/hero.jpg",
  "body": "Markdown text. Blank line between paragraphs. ## for headings."
}
```

`category` is one of: `Spiritual prompt`, `Professional prompt`, `Student's choice`, `Portfolio`. `cover` is optional.

## How it works

- `index.html` is the whole site (Home, Pricing, About, Blog). It loads `posts.json` to show the blog.
- `build-posts.js` runs on every Netlify deploy and combines everything in `posts/` into `posts.json`.
- `admin/` is the post editor (Decap CMS). Photos uploaded there go in `img/uploads/`.
