export interface IUpcomingCompleteQuizApiResponse {
  _id: string;
  code: string;
  title: string;
  description: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  questions: Question[];
  schadule: string;
  duration: number;
  score_per_question: number;
  type: string;
  difficulty: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  closed_at?: string;
  participants: number;
}

export interface Question {
  _id: string;
  title: string;
  options: Options;
}

export interface Options {
  A: string;
  B: string;
  C: string;
  D: string;
  _id: string;
}
