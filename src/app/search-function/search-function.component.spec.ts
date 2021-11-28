import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFunctionComponent } from './search-function.component';

describe('SearchFunctionComponent', () => {
  let component: SearchFunctionComponent;
  let fixture: ComponentFixture<SearchFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFunctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
