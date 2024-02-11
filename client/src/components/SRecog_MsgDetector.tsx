import { v4 as uuidv4 } from 'uuid';



export default function SRecog_MsgDetector(props: { speaker: string, message: string; }) {

  // 1. System Messages
  if (props.speaker === "system")
    return (
      <div key={uuidv4()} className="speechRecog_chats_system">
        <div><p>{props.message.replace(/#/g, "")}</p></div>
      </div>
    );

  // 2. Host Messages
  if (props.speaker === "host")
    return (
      <div className="speechRecog_chats speechRecog_chats_host" key={uuidv4()}>
        <p className='speechRecog_chats_nameText'>{props.speaker}</p>
        <p className='speechRecog_chats_bodyText'>{props.message}</p>
      </div>
    );

  // 3. Guest Messages
  if (props.speaker === "guest") {
    return (
      <div className="speechRecog_chats speechRecog_chats_guests" key={uuidv4()}>
        <p className='speechRecog_chats_nameText'>{props.speaker}</p>
        <p className='speechRecog_chats_bodyText'>{props.message}</p>
      </div>
    );
  }
}


