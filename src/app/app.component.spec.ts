import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClient = jasmine.createSpyObj('HttpClient', ['get']);
    await TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: httpClient }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Covid19Tracker'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Covid19Tracker');
  });
});
