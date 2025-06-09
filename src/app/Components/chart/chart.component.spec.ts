import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { ChartService } from './chart.service';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let chartService: jasmine.SpyObj<ChartService>;

  const mockLoad$ = new Subject<void>();
  const mockName$ = new Subject<string>();
  const mockData$ = new Subject<any>();

  beforeEach(async () => {
    chartService = jasmine.createSpyObj('ChartService', ['getInitialData'], {
      load$: mockLoad$,
      name$: mockName$,
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
      datasets: [{ data: [1, 2] }, { data: [3, 4] }],
    });
    fixture.detectChanges();
    const canvas = fixture.debugElement.query(By.css('canvas')).nativeElement;
    const loader = fixture.debugElement.query(By.css('mat-spinner'));
    expect(canvas).toBeTruthy();
    expect(loader).toBeFalsy();
  });

  it('make sure the loader is correctly rendered', () => {
    mockLoad$.next();
    fixture.detectChanges();
    const loader = fixture.debugElement.query(
      By.css('mat-spinner')
    ).nativeElement;
    expect(loader).toBeTruthy();
  });

  it('make sure location is correctly rendered', () => {
    mockName$.next('Beirut');
    fixture.detectChanges();
    expect(component.location).toEqual('Beirut');
  });
});
