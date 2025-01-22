export interface IDeleteStudent {
  data: IStudent;
  message: string;
}

export interface IStudent {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status?: string;
  role?: string;
  group?: IGroup;
}

export interface ITopFiveStudents {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
  group: IGroup;
  avg_score: number;
}
export interface IGroup {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: string[];
  max_students: number;
  updatedAt?: string;
  createdAt?: string;
  __v?: number;
}
export interface IAddUpdateStudentToGroup {
  message: string;
  data: AddToGroup;
}

export interface AddToGroup {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: IStudent[];
  max_students: number;
}
