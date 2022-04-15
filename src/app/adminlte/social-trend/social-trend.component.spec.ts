import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialTrendComponent } from './social-trend.component';

describe('SocialTrendComponent', () => {
  let component: SocialTrendComponent;
  let fixture: ComponentFixture<SocialTrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialTrendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialTrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
