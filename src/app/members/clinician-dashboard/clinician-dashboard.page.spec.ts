import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClinicianDashboardPage } from './clinician-dashboard.page';

describe('ClinicianDashboardPage', () => {
  let component: ClinicianDashboardPage;
  let fixture: ComponentFixture<ClinicianDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicianDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
