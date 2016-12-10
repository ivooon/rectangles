import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})

export class secondsToTime implements PipeTransform {
  	transform(seconds, args?) {
  		let date = new Date(null);
		date.setSeconds(seconds);
		return date.toISOString().substr(11, 8);
    };

}
