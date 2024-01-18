import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SpeechRecog from './pages/SpeechRecog';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/speech-recognizer" element={<SpeechRecog />} />
    </Routes>
  );
};