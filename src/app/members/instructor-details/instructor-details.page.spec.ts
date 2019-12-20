import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorDetailsPage } from './instructor-details.page';

describe('InstructorDetailsPage', () => {
  let component: InstructorDetailsPage;
  let fixture: ComponentFixture<InstructorDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorDetailsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
