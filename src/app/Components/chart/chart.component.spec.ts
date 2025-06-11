import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { ChartService } from './chart.service';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { formattedData } from './chart.interface';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let chartService: jasmine.SpyObj<ChartService>;

  const mockData$ = new Subject<formattedData>();

  beforeEach(async () => {
    chartService = jasmine.createSpyObj('ChartService', ['getGermanyData'], {
      data$: mockData$,
    });

    await TestBed.configureTestingModule({
      providers: [{ provide: ChartService, useValue: chartService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('make sure the canvas is correctly rendered', () => {
    mockData$.next({
      labels: ['Jan', 'Feb'],
      datasets: [
        [1, 2],
        [3, 4],
      ],
    });
    fixture.detectChanges();
    const canvas = fixture.debugElement.query(By.css('canvas')).nativeElement;
    const loader = fixture.debugElement.query(By.css('mat-spinner'));
    expect(canvas).toBeTruthy();
    expect(loader).toBeFalsy();
  });

  it('make sure the loader is correctly rendered', () => {
    fixture.detectChanges();
    const loader = fixture.debugElement.query(
      By.css('mat-spinner')
    ).nativeElement;
    expect(loader).toBeTruthy();
  });
});
