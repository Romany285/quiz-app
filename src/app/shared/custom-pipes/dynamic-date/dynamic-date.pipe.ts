import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "dynamicDate",
})
export class DynamicDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}
  transform(value: any, format: string = "shortDate"): string | null {
    if (!value) return null;
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return this.datePipe.transform(date, format);
  }
}
