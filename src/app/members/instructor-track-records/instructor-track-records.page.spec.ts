import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorTrackRecordsPage } from './instructor-track-records.page';

describe('InstructorTrackRecordsPage', () => {
  let component: InstructorTrackRecordsPage;
  let fixture: ComponentFixture<InstructorTrackRecordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorTrackRecordsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorTrackRecordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
