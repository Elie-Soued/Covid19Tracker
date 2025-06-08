import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';

import { of } from 'rxjs';
import { ChartService } from './chart.service';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let chartService: jasmine.SpyObj<ChartService>;

  beforeEach(async () => {
    const mockData = (chartService = jasmine.createSpyObj(
      'ChartService',
      ['getInitialData'],
      {
        chartData$: of({
          labels: ['2025-06-08'],
          datasets: [[39060164], [187696], [38870476]],
        }),
      }
    ));
    await TestBed.configureTestingModule({
      declarations: [ChartComponent],
      providers: [{ provide: ChartService, useValue: chartService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
