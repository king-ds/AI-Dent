import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TreatmentRecordPage } from './treatment-record.page';

describe('TreatmentRecordPage', () => {
  let component: TreatmentRecordPage;
  let fixture: ComponentFixture<TreatmentRecordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentRecordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TreatmentRecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
