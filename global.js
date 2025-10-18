console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/portfolio/";         // GitHub Pages repo name

let pages = [
  { url: 'index.html', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'cv/', title: 'CV/Resume' },
  { url: 'https://github.com/lmalottucsd', title: 'GitHub' }
];

  let nav = document.createElement('nav');
  document.body.prepend(nav);

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  // next step: create link and add it to nav

  if (!url.startsWith('http')) {
  url = BASE_PATH + url;
    }
    let a = document.createElement('a');
a.href = url;
a.textContent = title;
if (a.host === location.host && a.pathname === location.pathname) {
  a.classList.add('current');
}
 if (a.host !== location.host) {
    a.target = "_blank";
  }
nav.append(a);
}

const select = document.querySelector('.color-scheme select');

select.addEventListener('input', function (event) {
  const value = event.target.value;
  console.log('color scheme changed to', value);
  document.documentElement.style.setProperty('color-scheme', value);
});




