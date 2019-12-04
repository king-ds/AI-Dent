import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorViewerPage } from './instructor-viewer.page';

describe('InstructorViewerPage', () => {
  let component: InstructorViewerPage;
  let fixture: ComponentFixture<InstructorViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorViewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
