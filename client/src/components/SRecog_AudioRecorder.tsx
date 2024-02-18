export let mediaRecorder: MediaRecorder | null = null;

// AUDIO MEDIA STREAM
navigator.mediaDevices
  .getUserMedia({ audio: true, video: false })
  .then((stream: MediaStream) => {
    mediaRecorder = new MediaRecorder(stream);
  })
  .catch((error) => {
    console.log(`[Error] Failed to operate Audio Stream. Please refers to the message: ${error}...`);
  });


export let audioStart = function (): void {
  if (!mediaRecorder)
    return;
  else {
    mediaRecorder.start();
    console.log(mediaRecorder);
  }
};

export let audioPause = function (): void {
  if (!mediaRecorder)
    return;
  else {
    mediaRecorder.pause();
    console.log(mediaRecorder);

  };
};

export let audioResume = function (): void {
  if (!mediaRecorder)
    return;
  else {
    mediaRecorder.resume();
    console.log(mediaRecorder);
  }
};
