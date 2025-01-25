export interface ICreateAndDeleteQuestion {
  data: {
    title: string,
    description: string,
    options: {
        A: string,
        B: string,
        C: string,
        D: string,
        _id: string
    },
    answer: string,
    status: string,
    instructor: string,
    difficulty: string,
    points: number,
    type: string,
    _id: string,
    updatedAt: string,
    createdAt: string,
    __v: number
  },
  message: string
}
