import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesMenuComponent } from './classes-menu.component';

describe('ClassesMenuComponent', () => {
  let component: ClassesMenuComponent;
  let fixture: ComponentFixture<ClassesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
