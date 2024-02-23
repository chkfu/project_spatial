import { util_recorder_store } from "../util/Util_Recorder_store";



export let mediaRecorder: MediaRecorder | null = null;
export let audioChunks: Blob[] = [];


export const createMediaStream = async function (callbackfn: (success: boolean) => void) {

  // 1. recorder setup
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream: MediaStream) => {

      // 1a. stream setup
      mediaRecorder = new MediaRecorder(stream);
      callbackfn(true);
      console.log(`[System] Default Media Recorder is connected....`);

      // 1b. event listener
      mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstart = () => {
        console.log(`[System] Default Media Recorder start running....`);
      };

      mediaRecorder.onpause = () => {
        console.log(`[System] Default Media Recorder paused....`);
      };

      mediaRecorder.onresume = () => {
        console.log(`[System] Default Media Recorder continue....`);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/mp3; codecs=opus" });
        audioChunks = [];
        util_recorder_store.audioURL = window.URL.createObjectURL(blob);
        console.log(`[System] Default Media Recorder stop running....`);
      };
    })
    .catch((error) => {
      callbackfn(false);
      alert(`[Error] Failed to connect microphone. Please check your browser setting...`);
      console.log(`[Error] Failed to operate Audio Stream. Please refer to: ${error}....`);
    });
};



// FUNCTIONS

export let audioStart = function (): void {
  if (!mediaRecorder) return;
  return mediaRecorder.start();
};

export let audioPause = function (): void {
  if (!mediaRecorder) return;
  return mediaRecorder.pause();
};

export let audioResume = function (): void {
  if (!mediaRecorder) return;
  return mediaRecorder.resume();
};

export let audioStop = function (): void {
  if (!mediaRecorder) return;
  return mediaRecorder.stop();
};    
