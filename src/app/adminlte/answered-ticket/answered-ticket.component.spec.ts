import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnsweredTicketComponent } from './answered-ticket.component';

describe('AnsweredTicketComponent', () => {
  let component: AnsweredTicketComponent;
  let fixture: ComponentFixture<AnsweredTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnsweredTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnsweredTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
