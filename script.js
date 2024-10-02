let btn = document.querySelector("#btn");
        let content = document.querySelector("#content");
        let voice = document.querySelector("#voice");
        let clock = document.querySelector("#clock");
        let textInput = document.querySelector("#text-input");

        
        function speak(text) {
            let text_speak = new SpeechSynthesisUtterance(text);
            text_speak.rate = 1;
            text_speak.pitch = 1;
            text_speak.volume = 1;
            text_speak.lang = "hi-GB";
            window.speechSynthesis.speak(text_speak);
        }

        
        function wishMe() {
            let day = new Date();
            let hours = day.getHours();
            if (hours >= 0 && hours < 12) {
                speak("Good Morning Madam");
            } else if (hours >= 12 && hours < 16) {
                speak("Good afternoon Madam");
            } else {
                speak("Good Evening Madam");
            }
        }

        
        function showTime() {
            let now = new Date();
            let time = now.toLocaleTimeString();
            clock.innerText = time;
        }

        
        setInterval(showTime, 1000);

        window.addEventListener('load', () => {
            wishMe();
            showTime(); 
        });

        let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new speechRecognition();
        recognition.onresult = (event) => {
            let currentIndex = event.resultIndex;
            let transcript = event.results[currentIndex][0].transcript;
            content.innerText = transcript;
            takeCommand(transcript.toLowerCase());
        }

        btn.addEventListener("click", () => {
            recognition.start();
            voice.style.display = "block";
            btn.style.display = "none";
        });

        
        function takeCommand(message) {
            voice.style.display = "none";
            btn.style.display = "flex";
            content.innerText = message;

            if (message.includes("hello") || message.includes("hey")|| message.includes("Hi")) {
                speak("Hello sir, what can I help you with?");
            } else if (message.includes("who are you")) {
                speak("I am a virtual assistant, created by Ayush Sir");
            }
            else if (message.includes("What is your Name")) {
                speak("My name is Sara");
            }
    
            else if (message.includes("open youtube")) {
                speak("Opening YouTube...");
                window.open("https://youtube.com/", "_blank");
            } else if (message.includes("open google")) {
                speak("Opening Google...");
                window.open("https://google.com/", "_blank");
            } else if (message.includes("open facebook")) {
                speak("Opening Facebook...");
                window.open("https://facebook.com/", "_blank");
            } else if (message.includes("open instagram")) {
                speak("Opening Instagram...");
                window.open("https://instagram.com/", "_blank");
            } else if (message.includes("time")) {
                let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
                speak(time);
            } 
            else if (message.includes("Open Calculator")) {
                speak("opening Calculator");
                window.open("Calculator://","_blank")
            }
            else if (message.includes("Xbox")) {
                speak("Opening Xbox");
                window.open("https://www.xbox.com/en-IN/games/store/open-country/9pfgkw6cbnth","_blank")
                
            }
            
            else if (message.includes("date")) {
                let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
                speak(date);
            } else {
                let finalText = "This is what I found on the internet regarding " + message;
                speak(finalText);
                window.open(`https://www.google.com/search?q=${message}`, "_blank");
            }
        }

        
        textInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                let message = textInput.value.toLowerCase();
                takeCommand(message);
                textInput.value = "";
            }
        });