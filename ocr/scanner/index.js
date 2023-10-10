// Elementos de la vista
const mainTitle = document.createElement('h1');
mainTitle.textContent = 'Upload file to scan';
document.body.appendChild(mainTitle);

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.id = 'picker';
fileInput.addEventListener('change', load_file);
document.body.appendChild(fileInput);

// const mainDiv = document.createElement('div');
// mainDiv.id = 'main';
// document.body.appendChild(mainDiv);

// const noseDiv = document.createElement('div');
// noseDiv.id = 'nose';
// mainDiv.appendChild(noseDiv);

// const p1 = document.createElement('p');
// p1.textContent = 'No file loaded';
// noseDiv.appendChild(p1);

// const p1 = document.createElement('p');
// p1.textContent = 'No file loaded';
// noseDiv.appendChild(p2);

// const p2 = document.createElement('p');
// p2.textContent = 'Open a file first';
// p2.style.fontSize = '25px';

// const p3 = document.createElement('p');
// p3.textContent = "it's okay. I'll wait.";
// p3.style.fontSize = '15px';
// noseDiv.appendChild(p3);

// const p4 = document.createElement('p');
// p4.textContent = 'no seriously, I can\'t move';
// p4.style.fontSize = '10px';
// noseDiv.appendChild(p4);

// const p5 = document.createElement('p');
// p5.textContent = 'still waiting...';
// p5.style.fontSize = '8px';
// noseDiv.appendChild(p5);

// const transcriptionDiv = document.createElement('div');
// transcriptionDiv.id = 'transcription';
// mainDiv.appendChild(transcriptionDiv);


// Funciones
function recognize_image(){
	document.getElementById('transcription').innerText = "(Recognizing...)"

	OCRAD(document.getElementById("pic"), {
		numeric: true
	}, function(text){
					
	})
}
			
function load_file () {
	let reader = new FileReader();
	reader.onload = function(){
		let img = new Image();
		img.src = reader.result;
		img.onload = function(){
			document.getElementById('nose').innerHTML = ''
			document.getElementById('nose').appendChild(img)
			OCRAD(img, function(text){
				document.getElementById('transcription').className = "done"
				document.getElementById('transcription').innerText = text;
			})
		}
	}
	reader.readAsDataURL(document.getElementById('picker').files[0])
}