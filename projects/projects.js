import { fetchJSON, renderProjects } from "../global.js";
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm";

const arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
const colors = d3.scaleOrdinal(d3.schemeTableau10);
const projectsContainer = document.querySelector(".projects");
const searchInput = document.querySelector(".searchBar");

let query = "";
let selectedIndex = -1;

async function loadProjects() {
  const basePath =
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? ""
      : "/portfolio";

  const projects = await fetchJSON(`${basePath}/lib/projects.json`);
  if (!projects) {
    console.error("No projects found!");
    return;
  }

  document.querySelector("h1").textContent = `${projects.length} Projects`;
  renderProjects(projects, projectsContainer, "h2");

  function renderPieChart(allProjects) {
    const svg = d3.select("#projects-pie-plot");
    svg.selectAll("*").remove();

    const legend = d3.select(".legend");
    legend.selectAll("*").remove();

    if (!allProjects.length) return;

    const rolledData = d3.rollups(
      allProjects,
      (v) => v.length,
      (d) => d.year
    );

    const data = rolledData.map(([year, count]) => ({
      value: count,
      label: year,
    }));

    const sliceGenerator = d3.pie().value((d) => d.value);
    const arcData = sliceGenerator(data);

    const paths = svg
      .selectAll("path")
      .data(arcData)
      .enter()
      .append("path")
      .attr("d", arcGenerator)
      .attr("fill", (_, i) => colors(i))
      .attr("class", (_, i) => (i === selectedIndex ? "selected" : null))
      .style("cursor", "pointer")
      .on("click", (_, d) => {
        const idx = arcData.indexOf(d);
        selectedIndex = selectedIndex === idx ? -1 : idx;

        paths.attr("class", (_, i) => (i === selectedIndex ? "selected" : null));
        legendItems.attr("class", (_, i) =>
          i === selectedIndex ? "selected" : null
        );

        if (selectedIndex === -1) {
          document.querySelector("h1").textContent = `${projects.length} Projects`;
          renderProjects(projects, projectsContainer, "h2");
        } else {
          const selectedYear = data[selectedIndex].label;
          const filtered = projects.filter(
            (p) => String(p.year) === String(selectedYear)
          );
          document.querySelector("h1").textContent = `${filtered.length} Projects in ${selectedYear}`;
          renderProjects(filtered, projectsContainer, "h2");
        }
      });

    const legendItems = legend
      .selectAll("li")
      .data(data)
      .enter()
      .append("li")
      .attr("class", (_, i) => (i === selectedIndex ? "selected legend-item" : "legend-item"))
      .attr("style", (_, i) => `--color:${colors(i)}`)
      .html((d) => `<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`)
      .style("cursor", "pointer")
      .on("click", (_, d) => {
        const idx = data.findIndex((x) => x.label === d.label);
        selectedIndex = selectedIndex === idx ? -1 : idx;

        paths.attr("class", (_, i) => (i === selectedIndex ? "selected" : null));
        legendItems.attr("class", (_, i) =>
          i === selectedIndex ? "selected legend-item" : "legend-item"
        );

        if (selectedIndex === -1) {
          document.querySelector("h1").textContent = `${projects.length} Projects`;
          renderProjects(projects, projectsContainer, "h2");
        } else {
          const selectedYear = data[selectedIndex].label;
          const filtered = projects.filter(
            (p) => String(p.year) === String(selectedYear)
          );
          document.querySelector("h1").textContent = `${filtered.length} Projects in ${selectedYear}`;
          renderProjects(filtered, projectsContainer, "h2");
        }
      });
  }

  renderPieChart(projects);

  searchInput.addEventListener("input", (event) => {
    query = event.target.value.trim().toLowerCase();

    const filteredProjects = projects.filter((project) => {
      const titleMatch = project.title.toLowerCase().includes(query);
      const descMatch = project.description.toLowerCase().includes(query);
      const yearMatch = String(project.year).includes(query);
      return titleMatch || descMatch || yearMatch;
    });

    document.querySelector("h1").textContent = `${filteredProjects.length} Projects Found`;
    renderProjects(filteredProjects, projectsContainer, "h2");
  });
}

loadProjects();
