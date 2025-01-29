export interface IAddEdit {
  name:string,
  students:string[]
}
export interface IAddEditRes {
  _id :  string ,
  name : string ,
  status :  string ,
  instructor : string ,
     students : IstudentAddEditRes[],
     max_students :number
}
export   interface IstudentAddEditRes {
  _id :  string ,
  first_name :  string ,
  last_name :  string ,
  email : string
}
