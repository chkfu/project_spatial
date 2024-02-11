import { useAppDispatch } from '../redux/hooks';
import { switchSpeaker } from '../redux/slices/recognizerSlice';



export default function SRecog_SpeakerDetector(props: { speaker: string, activation: boolean, num: number; }) {

  // Redux
  const dispatch = useAppDispatch();

  // Host
  if (props.speaker === 'host' && props.activation)
    return (
      <div className="speechRecog_option_speaker">
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_active" viewBox="0 0 16 16">
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
          <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
        </svg>
        <p className="recog_icon_active">{props.speaker}</p>
        <p className="recog_icon_active">{`[${props.num}]`}</p>
      </div>
    );

  if (props.speaker === 'host' && !props.activation)
    return (
      <div className="speechRecog_option_speaker"
        onClick={() => dispatch(switchSpeaker('host'))}>
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
          <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
        </svg>
        <p>{props.speaker}</p>
        <p>{`[${props.num}]`}</p>
      </div>
    );

  // Guests

  if (props.speaker === 'guest' && props.activation) {
    return (
      <div className="speechRecog_option_speaker">
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_active" viewBox="0 0 16 16">
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
          <path d="M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
        </svg>
        <p className="recog_icon_active">{props.speaker}</p>
        <p className="recog_icon_active">{`[${props.num}]`}</p>
      </div>
    );
  }

  if (props.speaker === 'guest' && !props.activation)
    return (
      <div className="speechRecog_option_speaker"
        onClick={() => dispatch(switchSpeaker('guest'))}>
        <svg xmlns="http://www.w3.org/2000/svg" className="recog_icon_inactive" viewBox="0 0 16 16">
          <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z" />
        </svg>
        <p>{props.speaker}</p>
        <p>{`[${props.num}]`}</p>
      </div>
    );
}







