document.addEventListener("DOMContentLoaded", () => {
	const url =
		"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

	let dataset;
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			dataset = JSON.parse(JSON.stringify(data.data));

			const w = 1200;
			const h = 500;
			const padding = 30;

			const xScale = d3
				.scaleLinear()
				.domain([0, d3.max(dataset, (d) => d[0].slice(0, 4))])
				.range([[padding, w - padding]]);
			const yScale = d3
				.scaleLinear()
				.domain([0, d3.max(dataset, (d) => d[1])])
				.range([h - padding, padding]);

			console.log(dataset);

			const svg = d3.select("#svg");

			svg.append("svg").attr("width", w).attr("height", h);

			svg
				.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("fill", "black")
				.attr("x", (d, i) => i * 30)
				.attr("y", (d) => yScale(h - d[1]));
		});
});
