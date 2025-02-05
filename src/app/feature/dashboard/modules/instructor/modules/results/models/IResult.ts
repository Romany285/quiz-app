export interface IResult {
  quiz: Quiz;
  result: ResultDetail;
}

export interface Quiz {
  _id: string;
  title: string;
  description: string;
  type: string;
  difficulty: string;
  code: string;
  status: string;
  instructor: string;
  group: string;
  questions_number: number;
  schadule: string;
  duration: number;
  score_per_question: number;
  updatedAt: string;
  createdAt: string;
  closed_at: string;
}

export interface ResultDetail {
  _id: string;
  quiz: {
    _id: string;
    title: string;
  };
  participant: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  score: number;
  started_at: string;
  finished_at: string;
}
