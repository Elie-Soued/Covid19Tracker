import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { NavBarComponent } from './nav-bar.component';
import { By } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { Directive } from '@angular/core';
import { StateSelectComponent } from '../state-select/state-select.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClient }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Make sure the component is correctly rendered', () => {
    const sidenav_container = fixture.debugElement.query(
      By.css('mat-sidenav-container ')
    );
    const sidenav = fixture.debugElement.query(By.css('mat-sidenav'));
    const navlist = fixture.debugElement.query(By.css('mat-nav-list'));
    const state_select = fixture.debugElement.query(By.css('app-state-select'));

    expect(sidenav_container).toBeTruthy();
    expect(sidenav).toBeTruthy();
    expect(navlist).toBeTruthy();
    expect(state_select).toBeTruthy();
  });

  it('check that state was correctly updated', () => {
    const state_select = fixture.debugElement.query(
      By.directive(StateSelectComponent)
    );

    const childComponent =
      state_select.componentInstance as StateSelectComponent;

    childComponent.selectedCountry.emit('BE');

    fixture.detectChanges();

    expect(component.selectedState).toEqual('BE');
  });

  it('make sure fetchCovidDataPerState was called', () => {
    const fetchDataMock = spyOn(component, 'fetchCovidDataPerState');

    const submitButton = fixture.debugElement.query(
      By.css('#showGraph')
    ).nativeElement;

    submitButton.click();

    fixture.detectChanges();

    expect(fetchDataMock).toHaveBeenCalled();
  });
});
