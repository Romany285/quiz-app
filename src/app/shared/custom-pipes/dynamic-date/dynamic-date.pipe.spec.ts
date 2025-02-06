import { DatePipe } from "@angular/common";
import { DynamicDatePipe } from "./dynamic-date.pipe";
describe("DynamicDatePipe", () => {
  it("create an instance", () => {
    const datePipe = new DatePipe("en-US");
    const pipe = new DynamicDatePipe(datePipe);
    expect(pipe).toBeTruthy();
  });
});
