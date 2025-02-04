import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "floatNumber",
})
export class FloatNumberPipe implements PipeTransform {
  transform(value: number, decimals: number = 2): string {
    if (isNaN(value)) return "";
    return value.toFixed(decimals);
  }
}
