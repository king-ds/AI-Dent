import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferPatientPage } from './transfer-patient.page';

describe('TransferPatientPage', () => {
  let component: TransferPatientPage;
  let fixture: ComponentFixture<TransferPatientPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferPatientPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferPatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
