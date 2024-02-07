import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import short from 'short-uuid';

// Define a type for the slice state
interface RecognizerState {
  currentCaseId: string,
  currentSpeaker: string,
  newMsg: string[][];
}

// Define the initial state using that type
const initialState: RecognizerState = {
  currentCaseId: "default",
  currentSpeaker: "host",
  newMsg: [["system", "#### Section 1 ####"]]
};

export const recognizerSlice = createSlice({
  name: 'recognizer',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateCaseId: (state, action: PayloadAction<string>) => {
      state.currentCaseId = action.payload;
    },
    switchSpeaker: (state, action: PayloadAction<string>) => {
      state.currentSpeaker = action.payload;
    },
    updateMsgs: (state, action: PayloadAction<string[][]>) => {
      if (state.newMsg[state.newMsg.length - 1][0] === state.currentSpeaker) {
        state.newMsg[state.newMsg.length - 1][1] = `${state.newMsg[state.newMsg.length - 1][1]} ${action.payload[0][1]}`;
      }
      else {
        state.newMsg = [...state.newMsg, ...action.payload];
      }
    },
    resetRecog: (state) => {

    },
  },
});

export const { switchSpeaker, updateMsgs, resetRecog } = recognizerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export default recognizerSlice.reducer;


