export interface IQuizApiInterface {
  data: IQuiz;
  message: string;
}

export interface IQuiz {
  code?: string;
  status?: string;
  instructor?: string;
  questions?: string[];
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
  __v?: number;
  closed_at?: string,
  participants?: number
  type?: string;
  title: string;
  description?: string;
  group: string;
  questions_number?: number;
  difficulty?: string;
  schadule?: string;
  duration?: number;
  score_per_question?: number;
}
