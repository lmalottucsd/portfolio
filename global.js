console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/website/";         // GitHub Pages repo name

let pages = [
  { url: 'index.html', title: 'Home' },
  { url: 'projects/index.html', title: 'Projects' },
  { url: 'contact/index.html', title: 'Contact' },
  { url: 'cv/index.html', title: 'CV/Resume' },
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
    a.target = "_blank"; // opens in new tab or window
    a.rel = "noopener noreferrer"; // security best practice
  }
nav.append(a);
}





