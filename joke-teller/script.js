const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");

const toggleButton =()=> {
  button.disabled = !button.disabled;
}

const tellMe =(joke)=> {
  const jokeString = joke.trim().replace(/ /g, "%20");
  VoiceRSS.speech({
    key: "e985f868e96c46d9b0789c3855350152",
    src: jokeString,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

const getJokes = async ()=> {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
  }
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
