let params = new URLSearchParams(location.search);
let word = params.get("word");
let main = document.getElementById("mainContainer");
let body = document.querySelector("body");

fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
	.then((res) => res.json())
	.then((data) => {
		//cant find the word (error display)
		if (data["title"] && data["title"] === "No Definitions Found") {
			let h2 = document.createElement("h2");
			h2.innerText = data["title"];
			let message = document.createElement("div");
			message.innerHTML = data["message"];
			main.appendChild(h2);
			main.appendChild(message);
		} else {
			//finds a good word
			let wordObj = data[0];
			let wordTitle = document.createElement("h2");
            let phonetic = document.createElement("span");
			let audioElement = document.createElement("audio");
			phonetic.innerText = wordObj.phonetic;
			if (!wordObj.phonetic) {
				phonetic.innerText = wordObj.phonetics[1].text;
			}
			wordTitle.innerText = wordObj.word;
			wordTitle.style.alignSelf = "flex-start";
			wordTitle.style.marginLeft = "2%";
			audioElement.src = wordObj.phonetics[0].audio;
			if (wordObj.phonetics[0].audio === "") {
				audioElement.src = wordObj.phonetics[1].audio;
			}

			phonetic.addEventListener("click", () => {
				audioElement.play();
			});

			wordTitle.appendChild(phonetic);
			main.append(wordTitle);
			main.append(audioElement);
			let meanings = wordObj.meanings;
			for (let i = 0; i < meanings.length; i++) {
				let info = document.createElement("div");
				let pos = document.createElement("div");
				pos.innerText = meanings[i].partOfSpeech;
				pos.id = "pos";
				info.classList.add("info");
				info.appendChild(pos);
				for (let j = 0; j < meanings[i].definitions.length; j++) {
					let def = document.createElement("div");
					def.innerText = meanings[i].definitions[j].definition;
					info.appendChild(def);
				}
				main.appendChild(info);
			}
			console.log(data);

			//create word survey

			let form = document.createElement("form");
			let label = document.createElement("label");
			let dropdown = document.createElement("select");
			let opt1 = document.createElement("option");
			let opt2 = document.createElement("option");
			let opt3 = document.createElement("option");
			let opt4 = document.createElement("option");
			let submitBtn = document.createElement("button");

			label.htmlFor = "wordRating";
			label.innerText = "Rate this word:";
			dropdown.id = "wordRating";
			opt1.value = "Horrible";
			opt1.innerText = "Horrible";
			opt2.value = "Bad";
			opt2.innerText = "Bad";
			opt3.value = "Good";
			opt3.innerText = "Good";
			opt3.defaultSelected = true;
			opt4.value = "Amazing";
			opt4.innerText = "Amazing";
			submitBtn.type = "submit";
			submitBtn.innerText = "Send Feedback";

			form.addEventListener("submit", (e) => {
				e.preventDefault();
				document.location.href = "http://127.0.0.1:5500/";
			});

			dropdown.appendChild(opt1);
			dropdown.appendChild(opt2);
			dropdown.appendChild(opt3);
			dropdown.appendChild(opt4);
			form.appendChild(label);
			form.appendChild(dropdown);
			form.appendChild(submitBtn);
			body.appendChild(form);
		}
	})
	.catch((e) => console.error(e));

let home = document.getElementById("homeBtn");
let about = document.getElementById("aboutBtn");

home.addEventListener("click", () => {
	document.location.href = "http://127.0.0.1:5500";
});

about.addEventListener("click", () => {
	document.location.href = "http://127.0.0.1:5500/about.html";
});
