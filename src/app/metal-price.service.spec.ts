import { TestBed } from '@angular/core/testing';

import { MetalPriceService } from './metal-price.service';

describe('MetalPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetalPriceService = TestBed.get(MetalPriceService);
    expect(service).toBeTruthy();
  });
});
