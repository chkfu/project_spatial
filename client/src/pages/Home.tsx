import { Link } from 'react-router-dom';
import bg_video from '/videos/home_bg_hero.mp4';

export default function Home() {
  return (
    <main id="home_page">
      {/* Text Box */}
      <div id="home_section_hero">
        <video autoPlay muted id="home_video_bg">
          <source src={bg_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div id="home_hero_textbox">
          <h1>Echoing Stories</h1>
          <h1>Guilding Futures</h1>
          <h2>Turn Spoken Words into Text Tapestry, Craft Narratives Effortlessly, and Refine Your Stories Seamlessly.</h2>
          <div>
            <Link to="/login"><button>Get Started</button></Link>
          </div>

        </div>
      </div >
    </main>
  );
}






