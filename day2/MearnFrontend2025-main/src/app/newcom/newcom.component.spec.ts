import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcomComponent } from './newcom.component';

describe('NewcomComponent', () => {
  let component: NewcomComponent;
  let fixture: ComponentFixture<NewcomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewcomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewcomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
