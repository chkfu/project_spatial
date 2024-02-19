export let mediaRecorder: MediaRecorder | null = null;

export const createMediaStream = function (callbackfn: (success: boolean) => void): void {
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream: MediaStream) => {
      mediaRecorder = new MediaRecorder(stream);
      callbackfn(true);
      console.log(`[System] Default Media Recorder is connected....`);
    })
    .catch((error) => {
      callbackfn(false);
      alert(`[Error] Failed to connect microphone. Please check your browser setting...`);
      console.log(`[Error] Failed to operate Audio Stream. Please refer to: ${error}....`);
    });
};

// FUNCTIONS

export let audioStart = function (): void {
  if (!mediaRecorder)
    return;
  else {
    mediaRecorder.start();
    console.log(mediaRecorder);
    return;
  }
};

export let audioPause = function (): void {
  if (!mediaRecorder)
    return;
  else {
    mediaRecorder.pause();
    return;
  };
};

export let audioResume = function (): void {
  if (!mediaRecorder)
    return;
  else {
    mediaRecorder.resume();
    console.log(mediaRecorder);
    return;
  }
};
