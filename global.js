console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/" 
  : "/portfolio/"; 

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

document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark" selected>Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);

const themeLabel = document.querySelector('.color-scheme');
themeLabel.style.position = 'absolute';
themeLabel.style.top = '1rem';
themeLabel.style.right = '1rem';
themeLabel.style.fontSize = '0.8em';
themeLabel.style.fontFamily = 'inherit';

const select = document.querySelector('.color-scheme select');

if ("colorScheme" in localStorage) {
  const saved = localStorage.colorScheme;
  document.documentElement.style.setProperty('color-scheme', saved);
  select.value = saved;
}

select.addEventListener('input', function(event) {
  const value = event.target.value;
  console.log('color scheme changed to', value);
  document.documentElement.style.setProperty('color-scheme', value);
  localStorage.colorScheme = value;
});

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);
    console.log(response)
    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}
export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  containerElement.innerHTML = '';

  if (!Array.isArray(projects)) {
    console.error('renderProjects: expected an array but got', projects);
    return;
  }
  if (!containerElement) {
    console.error('renderProjects: containerElement not found!');
    return;
  }
  if (projects.length === 0) {
    containerElement.textContent = 'No projects to display.';
    return;
  }

  for (const project of projects) {
    const article = document.createElement('article');
    article.innerHTML = `
      <${headingLevel}>${project.title || 'Untitled Project'}</${headingLevel}>
      ${project.image ? `<img src="${project.image}" alt="${project.title || 'Project image'}">` : ''}
      <p>${project.description || 'No description available.'}</p>
    `;
    containerElement.appendChild(article);
  }
}
export async function fetchGitHubData(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Fetched GitHub data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
  }
}



