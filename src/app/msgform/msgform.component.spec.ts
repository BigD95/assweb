import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgformComponent } from './msgform.component';

describe('MsgformComponent', () => {
  let component: MsgformComponent;
  let fixture: ComponentFixture<MsgformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsgformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
