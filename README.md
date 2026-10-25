# Oluwatomi Joseph Maria — Portfolio

Experience and leadership portfolio website.

## Open it
Double-click `index.html`, or in VS Code install **Live Server**, right-click `index.html` and choose **Open with Live Server**.

## Folder structure
```
index.html                 Page content
css/styles.css             All styles (colours and fonts are tokens at the top)
js/main.js                 Scroll reveals, nav highlight, photo viewer, copy buttons
assets/images/
  portraits/               Hero portrait and campus gallery
  leadership/              Class group photo, NTD certificate, Hangout flyer
  healthcare/              Blood drive and Health Week outreach
  achievement/             Ingenii spelling bee
```

## Editing
- Text: edit `index.html`. Each section is marked with a comment, e.g. `<!-- ============ 2. HEALTHCARE ============ -->`.
- Colours: change the tokens in `:root` at the top of `css/styles.css` (dark mode values sit just below).
- Swap a photo: replace the file in `assets/images/...` keeping the same name, or update the `src` and `data-full` paths.

## Deploy
Upload the whole folder to Netlify Drop, Vercel or GitHub Pages. No build step needed.
