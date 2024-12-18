import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'newlineToBr'
})
export class NewlineToBrPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.replace(/(\r\n|\n\r|\n|\r)/g, '<br>');  // Thay thế \n hoặc \r thành <br>
  }
}
