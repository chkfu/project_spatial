
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setRecording, setRecognizer, resetRecog, breakSection, updateSectNum } from '../redux/slices/recognizerSlice';
import UserSidebar from "../components/UserSidebar";
import { SRecogStarter, SRecogTerminator } from "../components/SRecogFunction";
import { Span } from "next/dist/trace";



// MAIN

export default function SpeechRecog() {
  return (
    <main id="user_dashboard_speechRecog" className="user_dashboard_frame">
      <UserSidebar />

      <section id="user_dashboard_content_speechRecog" className="user_dashboard_contents">
        <SRecogInfoBox />
        <SRecogBody />
      </section>
    </main >
  );
}


// MAIN COMPONENTS

function SRecogInfoBox() {
  // Redux
  const redux_recog = useAppSelector(state => state.recognizer);
  // Return
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

function SRecogBody() {
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
  // Return
  return (
    <div id="speechRecog_body">
      <SRecog_ChatBoard containerRef={containerRef} />
      < SRecogControl />
    </div>
  );
}


// ADDITIONAL COMPONENTS

function SRecog_ChatBoard(props: { containerRef: React.RefObject<HTMLDivElement>; }) {
  // Redux
  const redux_recog = useAppSelector(state => state.recognizer);

  // Return
  return (
    <div id="speechRecog_chatBoard" ref={props.containerRef}>
      {
        redux_recog.newMsg.map((record: string[]): React.ReactNode => {
          return (
            <div key={uuidv4()}>
              {!record && <p>Please switch on speech recognition.</p>}
              {record[0] && <Chat_Msg_Detector speaker={record[0]} message={record[1]} />}
            </div>
          );
        })
      }
    </div >
  );
}

function SRecogControl() {
  return (
    <div id="speechRecog_controlPanel">
      <div id="controlPanel_msgController">
        <Control_Option_Detector type="Host" />
        <Control_Option_Detector type="Section Break" />
        <Control_Option_Detector type="Recording" />
        <Control_Option_Detector type="Recognizer" />
        <Control_Option_Detector type="Erase Messages" />
        <Control_Option_Detector type="Redirect" />
      </div>
    </div>
  );
}

function Control_Option_Detector(props: { type: string; }) {

  // Redux 
  const redux_recog = useAppSelector(state => state.recognizer);
  const dispatch = useAppDispatch();

  // Section Break
  if (props.type === "Section Break") {
    let temp: any[] = [];
    let next_sect: number = redux_recog.currentSection + 1;
    temp.push('system', `#### Section ${next_sect} ####`);
    return (
      <button onClick={() => {
        dispatch(breakSection(temp));
        dispatch(updateSectNum());
        return;
      }}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
            <path d="M14 4.5V9h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v7H2V2a2 2 0 0 1 2-2h5.5zM13 12h1v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2h1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zM.5 10a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1z" />
          </svg>
          <p className="recog_icon_inactive">New Section</p>
        </div>
      </button>
    );
  }
  // Audio Function
  if (props.type === "Recording") {
    if (redux_recog.recordingStatus === true)
      return (
        <button onClick={() => dispatch(setRecording())}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_active" viewBox="0 0 16 16">
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
              <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
            </svg>
            <p className="recog_icon_active">Recording</p>
          </div>
        </button>
      );
    else if (redux_recog.recordingStatus === false)
      return (
        <button onClick={() => dispatch(setRecording())}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
              <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3" />
              <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z" />
            </svg>
            <p className="recog_icon_inactive">Muted</p>
          </div>
        </button>);
  }
  // Scripting Function
  if (props.type === "Recognizer") {
    const dispatch = useAppDispatch();
    if (redux_recog.recognizerStatus === "started" || redux_recog.recognizerStatus === "resumed")
      return (
        <button onClick={() => { SRecogTerminator(); dispatch(setRecognizer()); }}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_active" viewBox="0 0 16 16">
              <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
              <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
            </svg>
            <p className="recog_icon_active">Noting</p>
          </div>
        </button>
      );
    else if (redux_recog.recognizerStatus === "stopped" || redux_recog.recognizerStatus === "inactive")
      return (
        <button onClick={() => { SRecogStarter(redux_recog.currentSpeaker, dispatch); dispatch(setRecognizer()); }}>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
            </svg>
            <p className="recog_icon_inactive">Suspend</p>
          </div>
        </button >
      );
  }
  // Erase Messages
  if (props.type === "Erase Messages") {
    return (
      <button onClick={() => dispatch(resetRecog())}>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className={`${redux_recog.newMsg.length === 1 ? "recog_icon_disabled" : "recog_icon_inactive"}`} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
          <p className={`${redux_recog.newMsg.length === 1 ? "recog_icon_disabled" : "recog_icon_inactive"}`}>Reset</p>
        </div>
      </button>
    );
  }
  // Redirect
  if (props.type === "Redirect") {
    return (
      <Link to="/">
        <button>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${redux_recog.newMsg.length === 1 ? "recog_icon_disabled" : "recog_icon_inactive"}`} viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
            <p className={`${redux_recog.newMsg.length === 1 ? "recog_icon_disabled" : "recog_icon_inactive"}`}>Next</p>
          </div>
        </button>
      </Link>
    );
  }
}

function Chat_Msg_Detector(props: { speaker: string, message: string; }) {
  if (props.speaker === "system")
    return (
      <div key={uuidv4()} className="speechRecog_chats_system">
        <div><p>{props.message.replace(/#/g, "")}</p></div>
      </div>
    );
  if (props.speaker === "host")
    return (
      <div className="speechRecog_chats speechRecog_chats_host" key={uuidv4()}>
        <p className='speechRecog_chats_nameText'>{props.speaker}</p>
        <p className='speechRecog_chats_bodyText'>{props.message}</p>
      </div>
    );
  if (props.speaker === "guest") {
    return (
      <div className="speechRecog_chats speechRecog_chats_guests" key={uuidv4()}>
        <p className='speechRecog_chats_nameText'>{props.speaker}</p>
        <p className='speechRecog_chats_bodyText'>{props.message}</p>
      </div>
    );
  }
}


