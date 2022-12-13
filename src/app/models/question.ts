import {Speaker} from "./speaker";

export class Question {
  id: any;
  questioner: string;
  speaker: Speaker;
  question: string;
  answer_video: string;
  answer_second: string
  answer_video_link: string;

  prepare(input: any) {
    Object.assign(this, input);
    if (input.speaker) {
      this.speaker = new Speaker().prepare(input.speaker.data);
    }
    return this;
  }
}
