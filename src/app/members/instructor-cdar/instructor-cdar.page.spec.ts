import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorCdarPage } from './instructor-cdar.page';

describe('InstructorCdarPage', () => {
  let component: InstructorCdarPage;
  let fixture: ComponentFixture<InstructorCdarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorCdarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorCdarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
