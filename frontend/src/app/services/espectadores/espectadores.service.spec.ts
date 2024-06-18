import { TestBed } from '@angular/core/testing';

import { EspectadoresService } from './espectadores.service';

describe('EspectadoresService', () => {
  let service: EspectadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspectadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
