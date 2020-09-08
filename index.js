// Creating custom tooltip
const tooltip = document.getElementById("tooltip");

// Url to be used in fetch request
const url =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

// fetching data from api
fetch(url)
	.then((res) => res.json())
	.then((data) => {
		const dataset = JSON.parse(JSON.stringify(data.data));

		// using the data in the function to create the bar chart
		createBarChart(dataset);
	});

const createBarChart = (data) => {
	// setting sizes of different elements and spacing between them
	const w = 1200;
	const h = 500;
	const padding = 50;
	const widthOfBar = (w - 2 * padding) / data.length;

	// creating <svg> element
	const svg = d3
		.select("#container")
		.append("svg")
		.attr("height", h)
		.attr("width", w);

	// creating scale to use in height of bars and x and y axes
	const xScale = d3
		.scaleLinear()
		.domain([
			d3.min(data, (d) => d[0].split("-")[0]),
			d3.max(data, (d) => d[0].split("-")[0]),
		])
		.range([padding, w - padding]);
	const yScale = d3
		.scaleLinear()
		.domain([0, d3.max(data, (d) => d[1])])
		.range([h - padding, padding]);

	// creating <rect> element for every data point in dataset
	svg
		.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("data-date", (d) => d[0])
		.attr("data-gdp", (d) => d[1])
		.attr("width", widthOfBar)
		.attr("height", (d) => h - yScale(d[1]))
		.attr("x", (d, i) => i * widthOfBar + padding)
		.attr("y", (d) => yScale(d[1]) - padding)
		.on("mouseover", (d, i) => {
			svg.append("tooltip");
			tooltip.setAttribute("data-date", i[0]);
			tooltip.style.left = d.clientX + "px"; // x position
			tooltip.style.top = h - padding * 2 + "px"; // y position
			tooltip.style.display = "block";
			tooltip.innerHTML = `${i[0]} \n $${i[1]} Billion`;
		})
		.on("mouseout", (d, i) => {
			tooltip.style.display = "none";
		});

	// NEED TO CREATE CUSTOM TOOLTIP

	// creating axes
	const xAxis = d3.axisBottom(xScale);
	const yAxis = d3.axisLeft(yScale);

	// visualizing x axis
	svg
		.append("g")
		.attr("transform", `translate(0, ${h - padding})`)
		.attr("id", "x-axis")
		.call(xAxis);

	// visualizing y axis
	svg
		.append("g")
		.attr("transform", `translate(${padding}, 0)`)
		.attr("id", "y-axis")
		.call(yAxis);
};
