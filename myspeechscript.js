// Script that uses google speech api to transform speech to text
// read google webkitSpeechRecognition documentation for more Knowledge
// Written by : Rajan Sharma 

function upgrade() {
      alert('Please use Google Chrome for best experience');
    }

    function startlistening() {
      if (!(window.webkitSpeechRecognition) && !(window.speechRecognition)) {
        upgrade();
      } else {
        var recognizing,
        transcription = document.getElementById('speech');
        interim_span = document.getElementById('interim');

        interim_span.style.opacity = '0.5';


        function reset() {
          recognizing = false;
          speech.start();
        }

        var speech = new webkitSpeechRecognition() || speechRecognition();

        speech.continuous = true;
        speech.interimResults = true;
        speech.lang = 'en-US'; // you can change the desired supported languages by google
        speech.start(); // starts listening by default

        speech.onstart = function() {
            // When recognition begins
            recognizing = true;
        };

        speech.onresult = function(event) {
          //  recognition produces result
          var interim_transcript = '';
          var final_transcript = '';

          // for loop for final and intermediate results
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              final_transcript += event.results[i][0].transcript;
            } else {
              interim_transcript += event.results[i][0].transcript;
            }
          }
          transcription.innerHTML = final_transcript;
          interim_span.innerHTML = interim_transcript;
          var a=transcription.innerHTML;
	  var b=document.getElementById('op').value;
	  document.getElementById('op').value=b+a;
        };

        speech.onerror = function(event) {
            // Revokes when there is no speech or no internet connection
            console.error(event.error);
        };

        speech.onend = function() {
            //recognition ends
			
            reset();
        };

      }
    };
 
