import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import short from 'short-uuid';

// Define a type for the slice state
interface RecognizerState {
  // 1. main states - passive
  currentCaseId: string;
  currentSpeaker: string;
  currentSection: number;
  newMsg: string[][];
  // 2. additional status - buttons
  infoStatus: boolean;
  recordingStatus: boolean;
  recognizerStatus: string;
  // 3. display - hidden information
  CaseInfoStatus: boolean;
}

// Define the initial state using that type
const initialState: RecognizerState = {
  // 1. main states - passive
  currentCaseId: "default",
  currentSpeaker: "host",
  currentSection: 1,
  newMsg: [["system", "#### Section 1 ####"]],
  // 2. additional status - buttons
  infoStatus: false,
  recordingStatus: false,
  recognizerStatus: "inactive",
  // 3. display - hidden information
  CaseInfoStatus: false
};

export const recognizerSlice = createSlice({
  name: 'recognizer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // 1. Main - Passive 
    updateCaseId: (state, action: PayloadAction<string>) => {
      state.currentCaseId = action.payload;
    },
    switchSpeaker: (state, action: PayloadAction<string>) => {
      state.currentSpeaker = action.payload;
    },
    updateSectNum: (state) => {
      state.currentSection += 1;
    },
    updateMsgs: (state, action: PayloadAction<string[][]>) => {
      if (state.newMsg[state.newMsg.length - 1][0] === state.currentSpeaker) {
        state.newMsg[state.newMsg.length - 1][1] = `${state.newMsg[state.newMsg.length - 1][1]} ${action.payload[0][1]}`;
      }
      else {
        state.newMsg = [...state.newMsg, ...action.payload];
      }
    },
    // 2. Additional - Control Panel
    breakSection: (state, action: PayloadAction<string[]>) => {
      state.newMsg = [...state.newMsg, action.payload];
    },
    setRecording: (state) => {
      if (state.recordingStatus === true)
        state.recordingStatus = false;
      else if (state.recordingStatus === false)
        state.recordingStatus = true;
    },
    setRecognizer: (state) => {
      if (state.recognizerStatus === "inactive")
        state.recognizerStatus = "started";
      else if (state.recognizerStatus === "started" || state.recognizerStatus === "resumed")
        state.recognizerStatus = "stopped";
      else if (state.recognizerStatus === "stopped")
        state.recognizerStatus = "resumed";
    },
    resetRecog: (state) => {
      state.newMsg = [["system", "#### Section 1 ####"]];
      state.recognizerStatus = "inactive";
      state.recordingStatus = false;
      state.currentSection = 1;
    },
    // 3. display - hidden information
    showCaseInfo: (state) => {
      if (!state.CaseInfoStatus)
        state.CaseInfoStatus = true;
      else
        state.CaseInfoStatus = false;
    }
  },
});

export const {
  switchSpeaker,
  updateMsgs,
  resetRecog,
  setRecognizer,
  setRecording,
  breakSection,
  updateSectNum,
  showCaseInfo
} = recognizerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export default recognizerSlice.reducer;


