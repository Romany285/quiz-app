import { Question } from "../../../../../../../shared/interfaces/upcoming-completed-quiz.interface";

export interface ISubmitAnswerApiResponse {
  data: ISubmitAnswer;
  message: string;
}

export interface ISubmitAnswer {
  _id: string;
  quiz: string;
  participant: string;
  score: number;
  started_at: string;
  finished_at: string;
  questions: Question[];
}
