import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'chartAt',
})
export class ChartAtPipe implements PipeTransform {

    transform(value: string, pos: number = 0): string {
        if (!value) {
            return value;
        }
        return value.charAt(pos);
    }

}
