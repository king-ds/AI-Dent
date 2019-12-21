import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorProfilePage } from './instructor-profile.page';

describe('InstructorProfilePage', () => {
  let component: InstructorProfilePage;
  let fixture: ComponentFixture<InstructorProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
