import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientTrackRecordsPage } from './patient-track-records.page';

describe('PatientTrackRecordsPage', () => {
  let component: PatientTrackRecordsPage;
  let fixture: ComponentFixture<PatientTrackRecordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientTrackRecordsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientTrackRecordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
