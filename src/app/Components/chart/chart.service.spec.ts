// import { TestBed } from '@angular/core/testing';
// import { ChartService } from './chart.service';
// import { HttpClient } from '@angular/common/http';

// describe('ChartService', () => {
//   let service: ChartService;
//   let httpClient: jasmine.SpyObj<HttpClient>;

//   beforeEach(() => {
//     httpClient = jasmine.createSpyObj('HttpClient', ['get']);

//     TestBed.configureTestingModule({
//       providers: [{ provide: HttpClient, useValue: httpClient }],
//     });
//     service = TestBed.inject(ChartService);
//   });

//   it('making sure formatData is working correctly', () => {
//     const mockData = {
//       id: 11,
//       name: 'Berlin',
//       population: 3755251,
//       cases: 1470297,
//       deaths: 6398,
//       casesPerWeek: 32,
//       deathsPerWeek: 0,
//       recovered: 1463783,
//       abbreviation: 'BE',
//       weekIncidence: 0.8521401099420518,
//       casesPer100k: 39153.0952258584,
//       delta: {
//         cases: 0,
//         deaths: 0,
//         recovered: 7,
//         weekIncidence: 4.2e-11,
//       },
//       hospitalization: {
//         cases7Days: 6,
//         incidence7Days: 0.16,
//         date: '2025-06-09T00:00:00.000Z',
//         lastUpdate: '2025-06-09T05:15:21.000Z',
//       },
//     };

//     const formattedData = {
//       labels: ['2025-06-09'],
//       datasets: [[1470297], [6398], [1463783]],
//     };

//     expect(JSON.stringify(service.formatData(mockData))).toEqual(
//       JSON.stringify(formattedData)
//     );
//   });

//   it('making sure getInitialData is working correctly', () => {
//     const formattedData = {
//       labels: ['2025-06-09'],
//       datasets: [[39060164], [187696], [38870607]],
//     };

//     service.getInitialData();

//     service.data$.subscribe((res) => {
//       expect(JSON.stringify(res)).toEqual(JSON.stringify(formattedData));
//     });
//   });
// });
