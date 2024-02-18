import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
// TS fucntions
import { fn_recognizorInfo } from '../util/caseInformation';
import { setRecording, setRecognizer, resetRecog, breakSection, updateSectNum, showCaseInfo, showLangList } from '../redux/slices/recognizerSlice';
import { SRecogStarter, SRecogTerminator } from './SRecog_SpeechRecognizer';
import { LanguageList } from '../util/declarations';
import { mediaRecorder } from './SRecog_AudioRecorder';
import { mediaRecorderContext } from '../pages/Case_SpeechRecog';


export default function SRecog_SVGDetector(props: { type: string; }) {

  // REDUX
  const redux_recog = useAppSelector(state => state.recognizer);

  // USE EFFECT
  useEffect(() => {
    function updateSpeaker() {
      return redux_recog.currentSpeaker;
    };
    updateSpeaker();
  }, [redux_recog.currentSpeaker]);

  useEffect(() => {
    function updateMediaRecorder() {
      return mediaRecorder;
    }
    updateMediaRecorder();
  }, []);


  // DECLARATIONS
  fn_recognizorInfo.curr_speaker = redux_recog.currentSpeaker;
  /*  Remarks: 
      React cannot update current speaker, if we only pass the state into the function  */


  // FILTERING

  // 1. Topbar Area

  if (props.type === "Prev Page") {
    console.log(mediaRecorder);
    return <SVG_PrevPageBtn />;
  }

  if (props.type === "Language")
    return <SVG_LangBtn />;

  if (props.type === "LangList Reminder")
    return <SVG_LangList_Reminder />;

  if (props.type === "Info")
    return <SVG_InfoBtn />;


  // 2. Control Panel Area

  if (props.type === "Section Break")
    return <SVG_SectionBreakBtn />;


  if (props.type === "inactive") {
    console.log(mediaRecorder);
    return;
  }

  if (props.type === "Recorder" && !mediaRecorder) {
    return (
      <button>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
            <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3" />
            <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z" />
          </svg>
          <p className="recog_icon_inactive">
            Audio Inactive
          </p>
        </div>
      </button >);
  }


  if (props.type === "Recorder" && (!mediaRecorder || mediaRecorder.state === 'inactive')) {
    return <SVG_AudioBtn_Inactive />;
  }

  if (props.type === "Recorder" && (mediaRecorder && mediaRecorder.state === 'recording')) {
    return <SVG_AudioBtn_Start />;
  }

  if (props.type === "Recorder" && (mediaRecorder && mediaRecorder.state === 'paused')) {
    return <SVG_AudioBtn_Pause />;
  }

  if (props.type === "Recorder" && redux_recog.recordingStatus === "resumed" && (mediaRecorder && mediaRecorder.state === 'recording')) {
    return <SVG_AudioBtn_Resume />;
  }


  if (props.type === "Recognizer" && (redux_recog.recognizerStatus === "started" || redux_recog.recognizerStatus === "resumed"))
    return <SVG_ScriptOnBtn />;

  if (props.type === "Recognizer" && (redux_recog.recognizerStatus === "stopped" || redux_recog.recognizerStatus === "inactive"))
    return <SVG_ScriptOffBtn />;

  if (props.type === "Erase Messages")
    return <SVG_EraseBtn />;

  if (props.type === "Redirect")
    return <SVG_NextStepBtn />;
}


// COMPONENTS

function SVG_PrevPageBtn() {
  return (
    <Link to="/">
      <button type="button">
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
        </svg>
      </button>
    </Link>
  );
}

function SVG_LangBtn() {
  const redux_case = useAppSelector(state => state.interview);
  const redux_recog = useAppSelector(state => state.recognizer);
  const dispatch = useAppDispatch();
  return (
    <button type="button" onClick={() => { dispatch(showLangList()); }}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`${redux_recog.LangListStatus && "recog_icon_active"}`} viewBox="0 0 16 16">
        <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
        <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
      </svg>
      <p className={`${redux_recog.LangListStatus && "recog_icon_active"}`}>{LanguageList[redux_case.language]}</p>
    </button>
  );
}

function SVG_LangList_Reminder() {
  const redux_recog = useAppSelector(state => state.recognizer);
  return (
    <div className={`speechRecog_hidden_langList_end ${redux_recog.LangListStatus ? "speechRecog_hidden_langList_end_active" : ""}`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </svg>
    </div>
  );
}

function SVG_InfoBtn() {
  const redux_recog = useAppSelector(state => state.recognizer);
  const dispatch = useAppDispatch();
  return (
    <button type="button" onClick={() => dispatch(showCaseInfo())}>
      <svg xmlns="http://www.w3.org/2000/svg" className={`${redux_recog.CaseInfoStatus && "recog_icon_active"}`} viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
      </svg>
      <p className={`${redux_recog.CaseInfoStatus && "recog_icon_active"}`}>Info</p>
    </button>
  );
}

function SVG_SectionBreakBtn() {
  const redux_recog = useAppSelector(state => state.recognizer);
  const dispatch = useAppDispatch();
  let temp: string[] = [];
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
        <p className="recog_icon_inactive">
          New Section
        </p>
      </div>
    </button>
  );
}

function SVG_AudioBtn_Inactive() {
  const dispatch = useAppDispatch();
  const { audioStart } = React.useContext(mediaRecorderContext);
  return (
    <button onClick={() => { dispatch(setRecording('started')); audioStart(); }}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
          <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3" />
          <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z" />
        </svg>
        <p className="recog_icon_inactive">
          Audio Inavtive
        </p>
      </div>
    </button>
  );
}

function SVG_AudioBtn_Start() {
  const dispatch = useAppDispatch();
  const { audioPause } = React.useContext(mediaRecorderContext);
  return (
    <button onClick={() => { dispatch(setRecording('paused')); audioPause(); }}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_active" viewBox="0 0 16 16">
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
        </svg>
        <p className="recog_icon_active">
          Recording
        </p>
      </div>
    </button>
  );
}

function SVG_AudioBtn_Pause() {
  const dispatch = useAppDispatch();
  const { audioResume } = React.useContext(mediaRecorderContext);
  return (
    <button onClick={() => { dispatch(setRecording('resumed')); audioResume(); }}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
          <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4 4 0 0 0 12 8V7a.5.5 0 0 1 1 0zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a5 5 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4m3-9v4.879l-1-1V3a2 2 0 0 0-3.997-.118l-.845-.845A3.001 3.001 0 0 1 11 3" />
          <path d="m9.486 10.607-.748-.748A2 2 0 0 1 6 8v-.878l-1-1V8a3 3 0 0 0 4.486 2.607m-7.84-9.253 12 12 .708-.708-12-12z" />
        </svg>
        <p className="recog_icon_inactive">
          Audio Paused
        </p>
      </div>
    </button>
  );
}

function SVG_AudioBtn_Resume() {
  const dispatch = useAppDispatch();
  const { audioPause } = React.useContext(mediaRecorderContext);
  return (
    <button onClick={() => { dispatch(setRecording('paused')); audioPause(); }}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_active" viewBox="0 0 16 16">
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
        </svg>
        <p className="recog_icon_active">Resume Recording</p>
      </div>
    </button>
  );
};



function SVG_ScriptOnBtn() {
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => { SRecogStarter(dispatch); dispatch(setRecognizer()); }}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_active" viewBox="0 0 16 16">
          <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2" />
        </svg>
        <p className="recog_icon_active">
          Scripting
        </p>
      </div>
    </button >
  );
}

function SVG_ScriptOffBtn() {
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => { SRecogTerminator(); dispatch(setRecognizer()); }}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708" />
        </svg>
        <p className="recog_icon_inactive">
          Script Off
        </p>
      </div>
    </button >
  );
}

function SVG_EraseBtn() {
  const redux_recog = useAppSelector(state => state.recognizer);
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch(resetRecog())}>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" className={`${redux_recog.newMsg.length === 1 ? "recog_icon_disabled" : "recog_icon_inactive"}`} viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
        </svg>
        <p className={`${redux_recog.newMsg.length === 1 ? "recog_icon_disabled" : "recog_icon_inactive"}`}>
          Reset
        </p>
      </div>
    </button>
  );
}

function SVG_NextStepBtn() {
  const redux_recog = useAppSelector(state => state.recognizer);
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