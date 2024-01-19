import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Define a type for the slice state
interface InterviewState {
  _id: string;
  time: Date;
  venue: string;
  host: string;
  interviewee: string;
  language: string;
  description: string;
  agreement: boolean;
  createdAt: Date;
}

// Define the initial state using that type
const initialState: InterviewState = {
  _id: uuidv4(),
  time: new Date(),
  venue: "",
  host: "",
  interviewee: "",
  language: 'en-uk',
  description: "",
  agreement: false,
  createdAt: new Date()
};

export const interviewSlice = createSlice({
  name: 'interview',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // action
  },
});

export const { /* action */ } = interviewSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export default interviewSlice.reducer;


