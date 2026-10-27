// Combines every post in /posts into one posts.json that the site reads.
// Netlify runs this automatically on every deploy (see netlify.toml).
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'posts');
const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith('.json')) : [];
const posts = [];

for (const file of files) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    if (!data.title || !data.date) {
      console.warn(`Skipping ${file}: missing title or date`);
      continue;
    }
    const date = String(data.date).slice(0, 10);
    posts.push({
      id: file.replace(/\.json$/, ''),
      title: data.title,
      date,
      category: data.category || '',
      cover: data.cover || '',
      body: data.body || '',
      created: fs.statSync(path.join(dir, file)).mtimeMs
    });
  } catch (err) {
    console.warn(`Skipping ${file}: ${err.message}`);
  }
}

posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.id < b.id ? 1 : -1));
posts.forEach(p => delete p.created);
fs.writeFileSync(path.join(__dirname, 'posts.json'), JSON.stringify(posts));
console.log(`Built posts.json with ${posts.length} posts`);
