import { updateMsgs } from "../../src/redux/slices/recognizerSlice";


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'zh-yue';
recognition.interimResults = true;
recognition.continuous = false;



export function SRecogStarter(speaker: string, dispatch: any) {
  // Recognizer Initialization
  recognition.start();
  console.log('[Recognisor] Default Speech Recognisor is activated...');
  // Recognizer On-progress
  recognition.onresult = (event: any) => {
    console.log(event);
    let temp: any[] = [];
    if (event.results[0].isFinal) {
      temp.push([speaker.toString(), event.results[0][0].transcript.toString()]);
      dispatch(updateMsgs(temp));
    }
  };
  // Recursion
  recognition.onend = () => {
    recognition.start();
    console.log('[Recognizer] Default Speech Recognisor is activated again...');
  };
};

export function SRecogTerminator() {
  recognition.stop();
  recognition.onresult = null;
  recognition.onend = null;
}
