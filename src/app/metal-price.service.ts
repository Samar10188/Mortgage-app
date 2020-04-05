import { Injectable } from '@angular/core';
import {Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetalPriceService {
  
  private goldPrice = new Subject<number>();
  private silverPrice = new Subject<number>();

  silverPrice$ = this.silverPrice.asObservable();
  goldPrice$ = this.goldPrice.asObservable();

  constructor() { }

  sendGoldPrice(message: number) {
    this.goldPrice.next(message);
}

sendSilverPrice(message: number) {
  this.silverPrice.next(message);
}

}
