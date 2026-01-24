import { Pipe, PipeTransform } from '@angular/core';
import { Signal } from '@angular/core';

@Pipe({name: 'signalValue'})
export class SignalValuePipe implements PipeTransform {
  transform<T>(signal: Signal<T>): T {
    return signal();
  }
}
