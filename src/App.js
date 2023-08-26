import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import microphone from "./Images/microphone.png";
import useClipboard from "react-use-clipboard";

const App = () => {
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy);

  const startListening = () => {
    return SpeechRecognition.startListening({
      continuous: true,
      language: "hi-IN",
    });
  };
  if (!browserSupportsSpeechRecognition) {
    return (
      <span style={{ color: "red" }}>
        Browser doesn't support speech recognition.
      </span>
    );
  }

  return (
    <div id="App">
      <div id="mikeStatus">
        <img src={microphone} alt="mike"></img>
        {listening ? "on" : "off"}
      </div>

      <div id="textAreea" onClick={()=> setTextToCopy(transcript)}>
        <textarea rows={10} cols={110} value={transcript} />
      </div>
      <div>
        <button onClick={startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={setCopied}>
          copied {isCopied ? "Yes! 👍" : "Nope! 👎"}
        </button>
      </div>
    </div>
  );
};
export default App;
