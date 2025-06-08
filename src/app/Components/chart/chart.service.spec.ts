import { TestBed } from '@angular/core/testing';
import { ChartService } from './chart.service';
import { HttpClient } from '@angular/common/http';

describe('ChartService', () => {
  let service: ChartService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClient }],
    });
    service = TestBed.inject(ChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
