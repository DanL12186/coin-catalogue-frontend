import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slugify' })
export class Slugify implements PipeTransform {
  transform(input: string): string {
    return input.split(' ').join('-').toLowerCase();
  }
}