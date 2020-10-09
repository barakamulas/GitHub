import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCount',
})
export class DateCountPipe implements PipeTransform {
  transform(value: any): string {
    let today: Date = new Date(); //get current date and time
    let todayWithNoTime: any = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    let dateDifference = Math.abs(value - todayWithNoTime); //returns value in miliseconds
    const secondsInDay = 86400; //60 seconds * 60 minutes in an hour * 24 hours in a day
    let dateDifferenceSeconds = dateDifference * 0.001; //converts miliseconds to seconds
    let dayCounter = dateDifferenceSeconds / secondsInDay;
    let months = dayCounter / 28;
    let weeks = dayCounter / 7;
    let years = dayCounter / 365;
    let unit: string;

    if (years >= 1 && value < todayWithNoTime) {
      unit = Math.round(years) > 1 ? 'years' : 'year';
      return `${Math.round(years)} ${unit}`;
    } else if (months >= 1 && value < todayWithNoTime) {
      unit = Math.round(months) > 1 ? 'months' : 'month';
      return `${Math.round(months)} ${unit}`;
    } else if (weeks >= 1 && value < todayWithNoTime) {
      unit = Math.round(weeks) > 1 ? 'weeks' : 'week';
      return `${Math.round(weeks)} ${unit}`;
    } else if (dayCounter >= 1 && value < todayWithNoTime) {
      unit = dayCounter > 1 ? 'days' : 'day';
      return `${dayCounter} ${unit}`;
    }
  }
}
