import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Case_Info from './pages/Case_Info';
import Case_SpeechRecog from './pages/Case_SpeechRecog';
import Case_ScriptEd from './pages/Case_ScriptEd';
import Error from './pages/Error';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="case-information" element={<Case_Info />} />
      <Route path="case-speech-recognizer" element={<Case_SpeechRecog />} />
      <Route path="case-script-editer" element={<Case_ScriptEd />} />

      <Route path="*" element={<Error />} />

    </Routes >
  );
};;;