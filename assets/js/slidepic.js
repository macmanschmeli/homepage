// Globales Objekt zum Speichern des aktuellen Index für jede Slideshow-ID
let slideIndices = {};
let timeoutHandles = {}; // Speichert die Timer für jede Slideshow
// Initialisiert alle Slideshows beim Laden der Seite
function initializeSlideshows() {
	let slideshowContainers = document.getElementsByClassName("slideshow-container");
	for (let i = 0; i < slideshowContainers.length; i++) {
		let id = slideshowContainers[i].id;
		if (id) {
			// Zeige die erste Slide an
			showSlides(id, 0);
			// Optional: Starte Auto-Play für jede Slideshow
			autoSlide(id);
		}
	}
}

// Rufe initializeSlideshows auf, wenn das Skript geladen wird
initializeSlideshows();

// Wenn Sie Auto-Play möchten, muss die autoSlide-Logik ebenfalls auf die ID umgestellt werden:

function autoSlide(slideshowId) {
	// Stoppe alten Timer
	if (timeoutHandles[slideshowId]) {
		clearTimeout(timeoutHandles[slideshowId]);
	} else {
		showSlides(slideshowId, 1);
		timeoutHandles[slideshowId] = setTimeout(function () {
			autoSlide(slideshowId);
		}, Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000);
		return;
	}

	// Wechsle zum nächsten Bild
	showSlides(slideshowId, 1);

	// Starte neuen Timer
	timeoutHandles[slideshowId] = setTimeout(function () {
		autoSlide(slideshowId);
	}, 10000);
}


function showSlides(slideshowId, n) {
	let i;
	let slideshow = document.getElementById(slideshowId);
	if (!slideshow) return; // Beenden, falls ID nicht gefunden

	let slides = slideshow.getElementsByClassName("mySlides");

	// Initialisierung des Index, falls noch nicht vorhanden
	if (slideIndices[slideshowId] === undefined) {
		slideIndices[slideshowId] = 1;
	}

	// Index aktualisieren
	if (n !== undefined) {
		slideIndices[slideshowId] += n;
	}
	let currentSlideIndex = slideIndices[slideshowId];

	// Randbedingungen prüfen
	if (currentSlideIndex > slides.length) { currentSlideIndex = 1 }
	if (currentSlideIndex < 1) { currentSlideIndex = slides.length }
	slideIndices[slideshowId] = currentSlideIndex; // Speichern

	// Alle Slides verstecken und
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}

	// Aktuelle Slide anzeigen und Dot aktivieren
	slides[currentSlideIndex - 1].style.display = "block";
}

// Funktionen für manuelle Steuerung (müssen ID übergeben)
function plusSlides(slideshowId, n) {
	showSlides(slideshowId, n);
}

function currentSlide(slideshowId, n) {
	// Setzt den Index direkt auf n (muss n-currentSlideIndex sein, um die Logik zu nutzen)
	let delta = n - slideIndices[slideshowId];
	showSlides(slideshowId, delta);
}