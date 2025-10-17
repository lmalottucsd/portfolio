console.log("IT’S ALIVE!");

// Helper function
function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

// Define pages
let pages = [
  { url: "", title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "contact/", title: "Contact" },
  { url: "cv/", title: "CV/Resume" },
  { url: "https://github.com/lmalottucsd", title: "GitHub" }
];

// Define base path depending on environment
const BASE_PATH =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "/" // local
    : "/portfolio/"; // <-- make sure this matches your GitHub repo name EXACTLY

// Create <nav> and prepend it
let nav = document.createElement("nav");
document.body.prepend(nav);

// Loop through pages and create links
for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // Adjust relative URLs
  if (!url.startsWith("http")) {
    url = BASE_PATH + url;
  }

  // Insert link
  nav.insertAdjacentHTML("beforeend", `<a href="${url}">${title}</a>`);
}
