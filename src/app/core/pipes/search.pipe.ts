import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(widths: number[], searchTerm: string): number[] {
    if (!searchTerm?.trim()) return widths;
  
    return widths.filter(width =>
      width.toString().startsWith(searchTerm.trim())
    );
  }
  
}
