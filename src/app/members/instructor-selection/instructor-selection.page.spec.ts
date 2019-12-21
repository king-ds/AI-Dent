import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorSelectionPage } from './instructor-selection.page';

describe('InstructorSelectionPage', () => {
  let component: InstructorSelectionPage;
  let fixture: ComponentFixture<InstructorSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
