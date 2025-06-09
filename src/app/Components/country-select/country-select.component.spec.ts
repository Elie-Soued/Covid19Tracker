import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { CountrySelectComponent } from './country-select.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatSelectChange } from '@angular/material/select';

describe('CountrySelectComponent', () => {
  let component: CountrySelectComponent;
  let fixture: ComponentFixture<CountrySelectComponent>;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient.get.and.returnValue(of({ data: [] }));

    await TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClient }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Make sure the countrySelector component is correctly rendered', () => {
    const label = fixture.debugElement.query(By.css('mat-label'));
    const select = fixture.debugElement.query(By.css('mat-select'));
    expect(label).toBeTruthy();
    expect(select).toBeTruthy();
  });

  it('Check that the country is properly selected', () => {});
});
