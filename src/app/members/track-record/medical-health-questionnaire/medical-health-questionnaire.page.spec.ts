import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicalHealthQuestionnairePage } from './medical-health-questionnaire.page';

describe('MedicalHealthQuestionnairePage', () => {
  let component: MedicalHealthQuestionnairePage;
  let fixture: ComponentFixture<MedicalHealthQuestionnairePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalHealthQuestionnairePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalHealthQuestionnairePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
