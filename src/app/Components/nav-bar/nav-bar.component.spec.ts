import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { NavBarComponent } from './nav-bar.component';

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
    // write tests
  });

  it('check that the correct call was executed', () => {
    // write test
  });
});
