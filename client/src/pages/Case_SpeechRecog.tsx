
import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateMsgs } from '../redux/slices/recognizerSlice';
import UserSidebar from "../components/UserSidebar";


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = 'zh-yue';
recognition.interimResults = true;
recognition.continuous = false;

export default function SpeechRecog() {
  return (
    <>
      <SRecogDisplay />
    </>
  );
}




// COMPONENTS

function SRecogDisplay() {

  // Use Ref
  const containerRef = useRef<HTMLDivElement>(null);

  // Redux
  const redux_recog = useAppSelector(state => state.recognizer);

  // Use Effect
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [redux_recog.newMsg]);

  // FUNCTIONS

  return (
    <main id="user_dashboard_speechRecog" className="user_dashboard_frame">
      <UserSidebar />

      <section id="user_dashboard_content_speechRecog" className="user_dashboard_contents">

        {/* Interview Detail */}
        <SRecogInfoBox />

        <div id="speechRecog_body">
          <div id="speechRecog_chatBoard" ref={containerRef}>
            {
              redux_recog.newMsg.map((record: string[]): React.ReactNode => {

                return (
                  <>
                    {
                      !record && <></>
                    }
                    {
                      record[0] === "system" &&
                      <div key={uuidv4()} className="speechRecog_chats_system">
                        <p> {record[1].replace(/#/g, "")}</p>
                      </div>
                    }
                    {
                      record[0] === "host" &&
                      <div className="speechRecog_chats speechRecog_chats_host" key={uuidv4()}>
                        <p className='speechRecog_chats_nameText'>{record[0]}</p>
                        <p className='speechRecog_chats_bodyText'>{record[1]}</p>
                      </div>
                    }
                    {
                      (record[0] !== "system" && record[0] !== "host") &&
                      <div className="speechRecog_chats speechRecog_chats_guests" key={uuidv4()}>
                        <p className='speechRecog_chats_nameText'>{record[0]}</p>
                        <p className='speechRecog_chats_bodyText'> {record[1]} </p>
                      </div>
                    }
                  </>
                );


              })
            }
          </div >
          {/* Button */}
          < SRecogControl />
        </div>

        {/* Chat Board */}
      </section>
    </main >
  );
}



// COMPONENTS

function SRecogInfoBox() {

  // Redux
  const redux_recog = useAppSelector(state => state.recognizer);

  return (
    <div id="speechRecog_infoBox">
      <div id="speechRecog_infoBox_left">
        <a href="">
          <img className="speechRecog_infoBox_icons" src="/icons/chevron-left.svg" alt="left icon" />
        </a>
        <p>{redux_recog.currentSpeaker}</p>
      </div>
      <div id="speechRecog_infoBox_right">
        <a href="">
          <img className="speechRecog_infoBox_icons" src="/icons/info-circle.svg" alt="info icon" />
        </a>
      </div>
    </div>
  );
}


function SRecogControl() {

  // Redux
  const redux_recog = useAppSelector(state => state.recognizer);
  const dispatch = useAppDispatch();

  return (
    <div id="speechRecog_controlPanel">
      <div id="controlPanel_msgController">

        <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="blue" className="bi bi-person-check" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
            <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
          </svg>
          <p>Host</p>
        </button>

        <button onClick={() => console.log('Section Break...')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-file-earmark-break" viewBox="0 0 16 16">
            <path d="M14 4.5V9h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v7H2V2a2 2 0 0 1 2-2h5.5zM13 12h1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2h1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zM.5 10a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1z" />
          </svg>
          <p>Break</p>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-mic-mute" viewBox="0 0 16 16">
            <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3" />
            <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z" />
          </svg>
          <p>Muted</p>
        </button>
        <button onClick={() => SRecogStarter(redux_recog.currentSpeaker, dispatch)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-chat-dots" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
          </svg>
          <p>Scripting</p>
        </button>
        <button onClick={() => console.log('clear data...')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
          <p>Reset</p>
        </button>
        <button onClick={() => console.log('clear data...')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
          <p>Next</p>
        </button>
      </div>
    </div>
  );
}

// FUNCTIONS

function SRecogStarter(speaker: string, dispatch: any) {

  // Recognizer Initialization
  recognition.start();
  console.log('[Recognisor] Default Speech Recognisor is activated...');

  // Recognizer On-progress
  recognition.onresult = (event: any) => {
    let temp: any[] = [];
    if (event.results[0].isFinal) {
      temp.push([speaker.toString(), event.results[0][0].transcript.toString()]);
      dispatch(updateMsgs(temp));
    }
  };

  recognition.onend = () => {
    recognition.start();
    console.log('[Recognizer] Default Speech Recognisor is activated again...');
  };
};


