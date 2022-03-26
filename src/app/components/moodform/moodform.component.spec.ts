import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodformComponent } from './moodform.component';

describe('MoodformComponent', () => {
  let component: MoodformComponent;
  let fixture: ComponentFixture<MoodformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
