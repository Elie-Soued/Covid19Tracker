import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { StateSelectComponent } from './state-select.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatSelectChange } from '@angular/material/select';

describe('StateSelectComponent', () => {
  let component: StateSelectComponent;
  let fixture: ComponentFixture<StateSelectComponent>;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    httpClient.get.and.returnValue(of({ data: [] }));

    await TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClient }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Make sure the countrySelector component is correctly rendered', () => {
    const label = fixture.debugElement.query(By.css('mat-label')).nativeElement;
    const select = fixture.debugElement.query(
      By.css('mat-select')
    ).nativeElement;

    select.click();

    const options = fixture.debugElement.query(
      By.css('mat-option')
    ).nativeElement;

    expect(label).toBeTruthy();
    expect(select).toBeTruthy();
    expect(options).toBeTruthy();
  });

  it('Check that the country is properly selected', () => {
    const setCountrySpy = spyOn(component, 'setSelectedCountry');

    const select = fixture.debugElement.query(
      By.css('mat-select')
    ).nativeElement;

    select.click();

    const berlin = fixture.debugElement.query(By.css('#Berlin')).nativeElement;

    berlin.click();

    expect(setCountrySpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ value: 'BE' })
    );
  });
});
