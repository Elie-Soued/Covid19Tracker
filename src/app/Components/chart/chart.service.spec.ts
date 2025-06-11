import { fakeAsync, TestBed } from '@angular/core/testing';
import { ChartService } from './chart.service';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import state_codes from '../state-select/state-codes';
import { provideHttpClient } from '@angular/common/http';

provideHttpClientTesting;

describe('ChartService', () => {
  let service: ChartService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChartService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('making sure getGermanyData get the values related to Germany and calls preloadStateData', () => {
    const formattedData = {
      labels: ['2025-06-09'],
      datasets: [[39060164], [187696], [38870607]],
    };

    const rawData = {
      cases: 39060164,
      deaths: 187696,
      recovered: 38870721,
      weekIncidence: 0.5606999479426253,
      casesPer100k: 46302.39306856323,
      casesPerWeek: 473,
      deathsPerWeek: 0,
      delta: {
        cases: 0,
        deaths: 0,
        recovered: 114,
        weekIncidence: -0.267903146357,
      },
      r: {
        value: 0.62,
        rValue4Days: {
          value: 0.62,
          date: '2023-06-17T00:00:00.000Z',
        },
        rValue7Days: {
          value: 0.79,
          date: '2023-06-16T00:00:00.000Z',
        },
        lastUpdate: '2025-04-09T13:58:00.000Z',
      },
      hospitalization: {
        cases7Days: 140,
        incidence7Days: 0.17,
        date: '2025-06-10T00:00:00.000Z',
        lastUpdate: '2025-06-10T05:15:19.000Z',
      },
      meta: {
        source: 'Robert Koch-Institut',
        contact: 'Marlon Lueckert (m.lueckert@me.com)',
        info: 'https://github.com/marlon360/rki-covid-api',
        lastUpdate: '2025-06-10T05:03:14.000Z',
        lastCheckedForUpdate: '2025-06-10T10:59:18.313Z',
      },
    };

    const preloadStateDataSpy = spyOn(service, 'preloadStateData');

    service.getGermanyData();

    const req = httpTesting.expectOne('https://api.corona-zahlen.org/germany');

    expect(req.request.method).toBe('GET');

    req.flush(rawData);

    expect(preloadStateDataSpy).toHaveBeenCalled();

    service.data$.subscribe((res) => {
      expect(JSON.stringify(res)).toEqual(JSON.stringify(formattedData));
    });
  });

  it('making sure preloadData creates statesData', () => {
    service.preloadStateData();

    // Respond to all state requests
    state_codes.forEach((state) => {
      const req = httpTesting.expectOne(
        `https://api.corona-zahlen.org/states/${state.code}`
      );

      const mockRawData = {
        data: {
          [state.code]: {
            name: `Mock ${state.code}`,
            cases: 1000,
            deaths: 10,
            recovered: 900,
            hospitalization: { date: '2024-01-01' },
          },
        },
      };

      req.flush(mockRawData);
    });

    // Now test the public method that uses statesData internally
    const exampleStateCode = state_codes[0].code; // e.g., 'BW'
    const expected = {
      name: `Mock ${exampleStateCode}`,
      data: {
        labels: ['2024-01-01'],
        datasets: [[1000], [10], [900]],
      },
    };

    // subscribe to data$ to see what gets emitted
    service.data$.subscribe((res) => {
      expect(res).toEqual(expected);
    });

    // trigger fetch
    service.fetchCovidDataPerState(exampleStateCode);
  });

  it('making sure formatData is working correctly', () => {
    const mockData = {
      id: 11,
      name: 'Berlin',
      population: 3755251,
      cases: 1470297,
      deaths: 6398,
      casesPerWeek: 32,
      deathsPerWeek: 0,
      recovered: 1463783,
      abbreviation: 'BE',
      weekIncidence: 0.8521401099420518,
      casesPer100k: 39153.0952258584,
      delta: {
        cases: 0,
        deaths: 0,
        recovered: 7,
        weekIncidence: 4.2e-11,
      },
      hospitalization: {
        cases7Days: 6,
        incidence7Days: 0.16,
        date: '2025-06-09T00:00:00.000Z',
        lastUpdate: '2025-06-09T05:15:21.000Z',
      },
    };
    const formattedData = {
      labels: ['2025-06-09'],
      datasets: [[1470297], [6398], [1463783]],
    };
    expect(JSON.stringify(service.formatData(mockData))).toEqual(
      JSON.stringify(formattedData)
    );
  });

  it('making sure fetchCovidDataPerState is working correctly', () => {
    const statesData = {
      BW: {
        name: 'Baden-Württemberg',
        data: {
          labels: ['2025-06-11'],
          datasets: [[5141754], [20977], [5120602]],
        },
      },
    };

    service.fetchCovidDataPerState('BW');

    service.data$.subscribe((res) => {
      expect(JSON.stringify(res)).toEqual(JSON.stringify(statesData['BW']));
    });
  });
});
