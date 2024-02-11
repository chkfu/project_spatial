import { updateMsgs } from "../redux/slices/recognizerSlice";
import { fn_recognizorInfo } from "../util/caseInformation";



const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'zh-yue';
recognition.interimResults = true;
recognition.continuous = false;



export function SRecogStarter(dispatch: any) {

  console.log(fn_recognizorInfo.curr_speaker);
  // Recognizer Initialization
  recognition.start();
  console.log('[Recognisor] Default Speech Recognisor is activated...');
  // Recognizer On-progress
  recognition.onresult = (event: any) => {
    console.log(event);
    let temp: any[] = [];
    if (event.results[0].isFinal) {
      temp.push([fn_recognizorInfo.curr_speaker.toString(), event.results[0][0].transcript.toString()]);
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
