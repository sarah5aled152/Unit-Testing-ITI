import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroServiceForLab } from './hero.lab.service';
import { Hero } from '../../hero';

describe('3-hero service (http) integration testing:', () => {
  let service: HeroServiceForLab;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroServiceForLab],
    });

    service = TestBed.inject(HeroServiceForLab);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('getHeroes function: send request and receive response successfully', () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Test Hero 1', strength: 100 },
      { id: 2, name: 'Test Hero 2', strength: 100 },
    ];

    service.getHeroes().subscribe((heroes: Hero[]) => {
      expect(heroes).toBeTruthy();
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('updateHero function: send request and receive response successfully', () => {
    const mockHero: Hero = {
      id: 1,
      name: 'Updated Hero',
      strength: 100,
    };

    service.updateHero(mockHero).subscribe((response: Hero) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes');
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.body).toEqual(mockHero);
    req.flush(mockHero);
  });
});
