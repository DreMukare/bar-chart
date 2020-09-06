const url =
	"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch(url)
	.then((res) => res.json())
	.then((data) => {
		document.getElementById("svg").innerHTML = `<p>${JSON.stringify(data.data)}
			</p>`;
	});
