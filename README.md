### Speech sythesis

Here I learned how to create a voice changing app with JavaScript.

The user is able to select different voices from the current device, adjust the rate and pitch as they like.

I created a new SpeechSynthesisUtterance instance, and set the text to be the textarea value with a default sentence to start with.

The populateVoices function creates a dropdown filled with voice options.

SetVoice function finds the voice the user chose.

When one of the input changes, function setOption sets the current value to the changed property.

There are Stop and Speak buttons, which enable you to cancel the current utterance and start over with a different voice.