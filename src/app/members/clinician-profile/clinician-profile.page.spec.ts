import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClinicianProfilePage } from './clinician-profile.page';

describe('ClinicianProfilePage', () => {
  let component: ClinicianProfilePage;
  let fixture: ComponentFixture<ClinicianProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicianProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
