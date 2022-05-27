let form = document.getElementById("wordForm");
let home = document.getElementById("homeBtn");
let about = document.getElementById("aboutBtn");

home.addEventListener("click", () => {
	document.location.href = "http://127.0.0.1:5500";
});

about.addEventListener("click", () => {
	document.location.href = "http://127.0.0.1:5500/about.html";
});

form.addEventListener("submit", (e) => {
	submitWord(e);
});

const submitWord = (e) => {
	e.preventDefault();
	let word = e.target.elements[0].value;
	document.location.href = `http://127.0.0.1:5500/word.html?word=${word}`;
};
