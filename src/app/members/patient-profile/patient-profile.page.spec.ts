import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientProfilePage } from './patient-profile.page';

describe('PatientProfilePage', () => {
  let component: PatientProfilePage;
  let fixture: ComponentFixture<PatientProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
