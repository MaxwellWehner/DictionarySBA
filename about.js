let home = document.getElementById("homeBtn");
let about = document.getElementById("aboutBtn");

home.addEventListener("click", () => {
	document.location.href = "http://127.0.0.1:5500";
});

about.addEventListener("click", () => {
	document.location.href = "http://127.0.0.1:5500/about.html";
});
