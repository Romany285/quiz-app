export interface IAuthRes {
  message: string;
  data: any;
}
export interface ILoginApiResponse {
  message: string;
  data: Data;
}

export interface Data {
  accessToken: string;
  refreshToken: string;
  profile: Profile;
}

export interface Profile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
}
