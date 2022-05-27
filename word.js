let params = new URLSearchParams(location.search);
let word = params.get("word");
let main = document.getElementById("mainContainer");

fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
	.then((res) => res.json())
	.then((data) => {
		if (data["title"] && data["title"] === "No Definitions Found") {
			let h2 = document.createElement("h2");
			h2.innerText = data["title"];
			let message = document.createElement("div");
			message.innerHTML = data["message"];
			main.appendChild(h2);
			main.appendChild(message);
		} else {
			let word = data[0];
			for (let i = 0; i < word.meanings.length; i++) {
				console.log(word.meanings[i].partOfSpeech);
			}
			console.log(data);
		}
	})
	.catch((e) => console.error(e));
