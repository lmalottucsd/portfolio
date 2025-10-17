console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a")
// let currentLink = navLinks.find(
//   (a) => a.host === location.host && a.pathname === location.pathname,
// );

// if (currentLink) {
//   // or if (currentLink !== undefined)
//   currentLink?.classList.add('current');
// }

  <nav>
  <ul>
    <li><a href="index.html">Home</a></li>
    <li><a href="projects/index.html">Projects</a></li>
    <li><a href="contact/index.html">Contact</a></li>
    <li><a href="cv/index.html">CV/Resume</a></li>
    <li><a href="https://github.com/lmalottucsd" target="_blank">GitHub</a></li>
  </ul>
  </nav>

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
  nav.insertAdjacentHTML('beforeend', `<a href="${url}">${title}</a>`);
}

