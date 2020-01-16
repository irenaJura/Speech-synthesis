// contains the content the speech service should read 
// and information about how to read it
const msg = new SpeechSynthesisUtterance();
let voices = []; // voices are getting dumped into
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// on page load set default to whatever is in the textbox
// .text gets and sets the text that will be synthesised when the utterance is spoken
msg.text = document.querySelector('[name="text"]').value;

// getVoices returns a list of SpeechSynthesisVoice objects 
// representing all the available voices on the current device
function populateVoices() {
    voices = this.getVoices();
    // console.log(voices);
    const voiceOptions = voices
        .filter(voice => voice.lang.includes('en'))
        .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
        .join('');
        voicesDropdown.innerHTML = voiceOptions;
}

// find the voice that lines up with the value
function setVoice(){
    // console.log(this.value);
    // .voice gets and sets the voice that will be used to speak the utterance
    // find() method returns the value of the first element 
    // in the provided array that satisfies the provided testing function
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

// restart the voice on change
function toggle(startOver = true) {
    speechSynthesis.cancel();
    if(startOver) {
        speechSynthesis.speak(msg);
    }
}

// what property and value changed 
// pitch, rate and text properties of SpeechSynthesisUtterance 
function setOption() {
    // console.log(this.name, this.value);
    msg[this.name] = this.value;
    toggle();
}

// speechSynthesis global variable with voiceschanged event listener
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false));