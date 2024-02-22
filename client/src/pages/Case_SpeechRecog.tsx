
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
// imported components
import UserSidebar from "../components/Comp_UserSidebar";
import Comp_SVGDetector from "../components/Comp_SVGDetector";
import Comp_MsgDetector from "../components/Comp_MsgDetector";
import Comp_SpeakerDetector from "../components/Comp_SpeakerDetector";
// imported functions
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateLang } from "../redux/slices/interviewSlice";
import { switchSpeaker, closeLists } from '../../src/redux/slices/recognizerSlice';
import { util_date_interpreter, util_timeInterpreter } from "../util/Util_Func_datetime.ts";
import { util_langlist } from "../util/Util_List_lang.ts";
import { audioStart, audioPause, audioResume, audioStop } from "../components/Comp_AudioRecorder";
import { util_recorder_store } from "../util/Util_Recorder_store.ts";


// MAIN

export default function SpeechRecog() {


  // Redux
  const redux_recog = useAppSelector(state => state.recognizer);
  const dispatch = useAppDispatch();

  // Use Effect
  React.useEffect(() => {
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      if (redux_recog.currentSpeaker && event.key === '1') {
        return dispatch(switchSpeaker('host'));
      }
      if (redux_recog.currentSpeaker && event.key === '2') {
        return dispatch(switchSpeaker('guest'));
      }
      if (event.key === 'Escape') {
        return dispatch(closeLists());
      }
    });
  }, []);

  // Return
  return (
    <main id="user_dashboard_speechRecog" className="user_dashboard_frame">
      {/* 1. Main Elements */}
      <UserSidebar />
      <section id="user_dashboard_content_speechRecog" className="user_dashboard_contents">
        <SRecogInfoBox />
        <SRecogBody />
      </section>
      {/* 2. Hidden Elements */}
      <SRecog_LangList />
      <SRecog_ExtendList />
    </main>
  );
}


// MAIN COMPONENTS

function SRecogInfoBox() {
  // Redux
  const redux_case = useAppSelector(state => state.interview);
  const redux_recog = useAppSelector(state => state.recognizer);
  // Return
  return (
    <div id="speechRecog_infoBox">
      {/* 1. informaiton box left */}
      <div id="speechRecog_infoBox_left">
        <Comp_SVGDetector type="Prev Page" />
        <h4 className="speechRecog_infoBox_title">
          {redux_case.title.length > 0 ? `${redux_case.title}` : `Case ${redux_case._id}`}</h4>
      </div>
      {/* 2. informaiton box right */}
      <div id="speechRecog_infoBox_right">
        <Comp_SVGDetector type="Language" />
        <Comp_SVGDetector type="Info" />
      </div>
    </div>
  );
}

function SRecog_ExtendList() {

  // Redux
  const redux_recog = useAppSelector(state => state.recognizer);
  const redux_case = useAppSelector(state => state.interview);
  return (
    <div className={`speechRecog_hidden_infoList ${redux_recog.caseInfoStatus ? "speechRecog_hidden_infoList_active" : ""}`}>
      <div className="speechRecog_hidden_tableLeft speechRecog_hidden_tableCol">
        <SRecog_InfoList_Rows heading="identifier" content={redux_case._id} />
        <SRecog_InfoList_Rows heading="Title" content={redux_case.title} />
        <SRecog_InfoList_Rows heading="Interviewer" content={redux_case.host} />
        <SRecog_InfoList_Rows heading="Attendee" content={redux_case._guest} />
        <SRecog_InfoList_Rows heading="Date" content={util_date_interpreter(redux_case.time, 'long')} />
        <SRecog_InfoList_Rows heading="Time" content={util_timeInterpreter(redux_case.time, '12')} />
        <SRecog_InfoList_Rows heading="Venue" content={redux_case.venue} />
        <SRecog_InfoList_Rows heading="Language" content={util_langlist[redux_case.language]} />
      </div>
      <div className="speechRecog_hidden_infoList_btnBox">
        <Link to='/'>
          <button className={`infoList_btnEdit ${redux_recog.caseInfoStatus && "infoList_btnEdit_active"}`} type="button">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}

export const mediaRecorderContext = React.createContext({ audioStart, audioPause, audioResume, audioStop });

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
    (function () {
      return util_recorder_store.audioURL;
    })();
  }, [redux_recog.newMsg, util_recorder_store.audioURL]); // Remarks: Chatboard always scroll to bottom as piority

  // Return
  return (
    <mediaRecorderContext.Provider value={{ audioStart, audioPause, audioResume, audioStop }}>
      <div id="speechRecog_body">
        <SRecog_AudioField />
        <SRecog_ChatBoard containerRef={containerRef} />
        <SRecog_SpeakerPanel />
        <SRecog_FnControl />
      </div>
    </mediaRecorderContext.Provider >
  );
}


// ADDITIONAL COMPONENTS

// 1. Topbar Area

function SRecog_InfoList_Rows(props: { heading: string, content: string; }) {
  return (
    <div>
      <p className="infotable_left">{props.heading}</p>
      <p className="infotable_right">{props.content}</p>
    </div>
  );
}

function SRecog_LangList() {
  const lang_arr: string[] = [];
  const redux_recog = useAppSelector(state => state.recognizer);
  for (const entry in util_langlist) {
    lang_arr.push(entry);
  }
  return (
    <div className={`speechRecog_hidden_langList ${redux_recog.langListStatus ? "speechRecog_hidden_langList_active" : ""}`}>
      <SRecog_LangOptionList lang_arr={lang_arr} />
      <Comp_SVGDetector type="LangList Reminder" />
    </div>
  );
}

function SRecog_LangOptionList(props: { lang_arr: string[]; }) {
  const dispatch = useAppDispatch();
  return (
    <ul>
      {
        props.lang_arr.map((lang_code: string) => {
          return (
            <li key={lang_code} className="langList_options"
              onClick={() => dispatch(updateLang(lang_code))}>
              {util_langlist[lang_code]}
            </li>
          );
        })
      }
    </ul>
  );
}


// 2. Body Area

function SRecog_AudioField() {
  return (
    <div id="speechRecog_audioField">

    </div>
  );
}

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
              {record[0] && <Comp_MsgDetector speaker={record[0]} message={record[1]} />}
            </div>
          );
        })
      }
    </div>
  );
}


// 3. Bottom Area

function SRecog_SpeakerPanel() {
  // Redux
  const redux_recog = useAppSelector(state => state.recognizer);
  return (
    <div id="speechRecog_speakerPanel">
      <div id="speechRecog_speakerPanel_bottom"></div>
      <div id="speechRecog_speakerPanel_top">
        {
          redux_recog.currentSpeaker === 'host' ?
            <Comp_SpeakerDetector speaker='host' activation={true} num={1} /> :
            <Comp_SpeakerDetector speaker='host' activation={false} num={1} />
        }
        {
          redux_recog.currentSpeaker === 'guest' ?
            <Comp_SpeakerDetector speaker='guest' activation={true} num={2} /> :
            <Comp_SpeakerDetector speaker='guest' activation={false} num={2} />
        }
      </div>
    </div>
  );
}

function SRecog_FnControl() {
  return (
    <div id="speechRecog_controlPanel">
      <div id="controlPanel_msgController">
        <Comp_SVGDetector type="Host" />
        <Comp_SVGDetector type="Section Break" />
        <Comp_SVGDetector type="Recorder" />
        <Comp_SVGDetector type="Recognizer" />
        <Comp_SVGDetector type="Erase Messages" />
        <Comp_SVGDetector type="Redirect" />
      </div>
    </div>
  );
}