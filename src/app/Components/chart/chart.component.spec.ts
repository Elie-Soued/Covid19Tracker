// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ChartComponent } from './chart.component';

// import { of } from 'rxjs';
// import { ChartService } from './chart.service';

// describe('ChartComponent', () => {
//   let component: ChartComponent;
//   let fixture: ComponentFixture<ChartComponent>;
//   let chartService: jasmine.SpyObj<ChartService>;

//   beforeEach(async () => {
//     chartService = jasmine.createSpyObj('ChartService', ['getInitialData']);

//     await TestBed.configureTestingModule({
//       declarations: [ChartComponent],
//       providers: [{ provide: ChartService, useValue: chartService }],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ChartComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should call getInitialData on init', () => {
//     expect(chartService.getInitialData).toHaveBeenCalled();
//   });
// });
