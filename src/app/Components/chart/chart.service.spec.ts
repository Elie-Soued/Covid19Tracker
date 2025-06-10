import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ChartService } from './chart.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

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

  it('making sure fetchCovidDataPerState is working correctly', fakeAsync(() => {
    let receivedName = '';
    let receivedData = {};

    const rawData = {
      data: {
        BY: {
          id: 9,
          name: 'Bayern',
          population: 13369393,
          cases: 6873938,
          deaths: 31434,
          casesPerWeek: 133,
          deathsPerWeek: 0,
          recovered: 6842123,
          abbreviation: 'BY',
          weekIncidence: 0.9948095624087047,
          casesPer100k: 51415.48311131253,
          delta: {
            cases: 0,
            deaths: 0,
            recovered: 27,
            weekIncidence: -0.291711074691,
          },
          hospitalization: {
            cases7Days: 48,
            incidence7Days: 0.36,
            date: '2025-06-10T00:00:00.000Z',
            lastUpdate: '2025-06-10T05:15:19.000Z',
          },
        },
      },
      meta: {
        source: 'Robert Koch-Institut',
        contact: 'Marlon Lueckert (m.lueckert@me.com)',
        info: 'https://github.com/marlon360/rki-covid-api',
        lastUpdate: '2025-06-10T05:03:14.000Z',
        lastCheckedForUpdate: '2025-06-10T10:56:34.803Z',
      },
    };

    const formattedData = {
      labels: ['2025-06-10'],
      datasets: [[6873938], [31434], [6842123]],
    };

    service.name$.subscribe((name) => {
      receivedName = name;
    });

    service.data$.subscribe((data) => {
      receivedData = data;
    });

    httpClient.get.and.returnValue(of(rawData));

    service.fetchCovidDataPerState('BY');

    tick();

    expect(receivedName).toEqual('Bayern');

    expect(httpClient.get).toHaveBeenCalledWith(
      'https://api.corona-zahlen.org/states/BY'
    );

    expect(JSON.stringify(receivedData)).toEqual(JSON.stringify(formattedData));
  }));

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

  it('making sure getInitialData is working correctly', () => {
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

    const formattedData = {
      labels: ['2025-06-09'],
      datasets: [[39060164], [187696], [38870607]],
    };

    httpClient.get.and.returnValue(of(rawData));

    service.getInitialData();

    expect(httpClient.get).toHaveBeenCalledWith(
      'https://api.corona-zahlen.org/germany'
    );
    service.data$.subscribe((res) => {
      expect(JSON.stringify(res)).toEqual(JSON.stringify(formattedData));
    });
  });
});
