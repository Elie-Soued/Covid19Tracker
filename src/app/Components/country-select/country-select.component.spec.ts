import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountrySelectComponent } from './country-select.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('CountrySelectComponent', () => {
  let component: CountrySelectComponent;
  let fixture: ComponentFixture<CountrySelectComponent>;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient.get.and.returnValue(of({ data: [] })); // ✅ Return observable

    await TestBed.configureTestingModule({
      declarations: [CountrySelectComponent],
      providers: [{ provide: HttpClient, useValue: httpClient }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Make sure the countrySelector component is correctly rendered', () => {
    // Test to write
  });

  it('Fetch all countries on Init', () => {
    // Test to write
  });

  it('Check that the country is properly selected', () => {
    // Test to write
  });
});
