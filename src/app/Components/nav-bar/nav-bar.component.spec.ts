import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { NavBarComponent } from './nav-bar.component';
import { By } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);

    await TestBed.configureTestingModule({
      declarations: [NavBarComponent],
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
    const country_select = fixture.debugElement.query(
      By.css('app-country-select')
    );

    expect(sidenav_container).toBeTruthy();
    expect(sidenav).toBeTruthy();
    expect(navlist).toBeTruthy();
    expect(country_select).toBeTruthy();
  });

  it('check that the correct call was executed', () => {
    console.log('component :>> ', component);
  });
});
