import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PatientDashboardPage } from './patient-dashboard.page';

describe('PatientDashboardPage', () => {
  let component: PatientDashboardPage;
  let fixture: ComponentFixture<PatientDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PatientDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
