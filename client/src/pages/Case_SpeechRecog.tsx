
import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../redux/hooks";


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'zh-yue';
recognition.interimResults = true;
recognition.continuous = false;

export default function SpeechRecog() {

  const [newMsg, setNewMsg] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [newMsg]);


  const count = useAppSelector((state: any) => state.interview._id);
  console.log(count);

  // FUNCTIONS

  return (
    <div>
      <div ref={containerRef} style={{ border: '2px solid red', overflow: 'auto', display: "flex", flexDirection: "column", height: "500px" }}>
        {
          newMsg.map((message: string): React.ReactNode => {
            return (
              <div key={uuidv4()}>
                <p>speaker</p>
                <p style={{ border: '2px solid blue', display: "inline-block", width: 'auto', padding: '8px' }}> {message} </p>
              </div>
            );
          })
        }
      </div>
      <button onClick={() => { SRecogStarter(newMsg, setNewMsg); }}>Click</button>
    </div >
  );
}



// FUNCTIONS

function SRecogStarter(newMsg: string[], setNewMsg: React.Dispatch<React.SetStateAction<string[]>>) {
  // Recognizer Initialization
  recognition.start();
  console.log('[Recognisor] Default Speech Recognisor is activated...');

  // Recognizer On-progress
  recognition.onresult = (event: any) => {
    if (event.results[0].isFinal) {
      newMsg.push(event.results[0][0].transcript);
      setNewMsg([...newMsg]);
    }
  };

  recognition.onend = () => {
    recognition.start();
    console.log('[Recognizer] Default Speech Recognisor is activated again...');
  };
};


