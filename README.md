# LUME DESIGN — Photography & Creative Studio

A responsive, single-page portfolio site for a photography and creative studio: filterable gallery with lightbox, service packages, booking modal, journal, and newsletter signup.

Built with plain HTML, [Tailwind CSS](https://tailwindcss.com) (CDN), Google Fonts and Font Awesome. No build step required.

## Project structure

```
.
├── index.html               # Page markup
├── css/
│   └── styles.css           # Custom styles
├── js/
│   ├── tailwind.config.js   # Tailwind theme (fonts, colors)
│   └── main.js              # Gallery data, lightbox, booking modal, menu
├── .github/workflows/
│   └── pages.yml            # Auto-deploy to GitHub Pages
├── .nojekyll
├── LICENSE
└── README.md
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages

1. Create a new repository on GitHub and push this folder (see below).
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push to `main`; the workflow in `.github/workflows/pages.yml` publishes the site at
   `https://<your-username>.github.io/<repo-name>/`.

Prefer no Actions? Set **Source** to **Deploy from a branch**, pick `main` and `/ (root)`, and delete the `.github` folder.

## Customize

- **Gallery items:** edit the `galleryItems` array at the top of `js/main.js`.
- **Colors and fonts:** edit `js/tailwind.config.js`.
- **Copy and sections:** edit `index.html`.
- **Booking and newsletter forms** are front-end demos only. To receive real submissions, connect them to a service such as Formspree, Netlify Forms, or your own backend.

## Notes

- Images are loaded from Unsplash for demo purposes. Replace them with your own photos in an `assets/` folder for production.
- Tailwind is loaded via the Play CDN, which is great for prototypes. For a production site, consider building Tailwind CSS with its CLI.

## License

[MIT](LICENSE)
