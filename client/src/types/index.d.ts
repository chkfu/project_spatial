export { };

/* REMARKS:
   Typescript has no "window" type:-
   (1) declare golbal in this file 
   (2) update tsconfig.json
       add "typeRoots": ["./src/types", "./types"]
*/

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    SpeechGrammarList: any;
    webkitSpeechGrammarList: any;
    SpeechRecognitionEvent: any;
    webkitSpeechRecognitionEvent: any;
  }
}