import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiagnosisTreatmentplanPage } from './diagnosis-treatmentplan.page';

describe('DiagnosisTreatmentplanPage', () => {
  let component: DiagnosisTreatmentplanPage;
  let fixture: ComponentFixture<DiagnosisTreatmentplanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiagnosisTreatmentplanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiagnosisTreatmentplanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
