interface StoreType {
  curr_speaker: string,
  final_msgs: string[][];
}

export let util_recognizer_store: StoreType = {
  curr_speaker: "host",
  final_msgs: []
};