import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import User from './pages/User';
import Case_Info from './pages/Case_Info';
import Case_Deed from './pages/Case_Deed';
import Case_SpeechRecog from './pages/Case_SpeechRecog';
import Case_ScriptEd from './pages/Case_ScriptEd';
import Error from './pages/Error';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />


      <Route path="/users/:id">
        <Route index element={<User />} />
        <Route path="case-information" element={<Case_Info />} />
        <Route path="case-deed" element={<Case_Deed />} />
        <Route path="case-speech-recognizer" element={<Case_SpeechRecog />} />
        <Route path="case-script-editer" element={<Case_ScriptEd />} />
      </Route>

      <Route path="*" element={<Error />} />

    </Routes >
  );
};;;