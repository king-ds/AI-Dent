import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicalHistoryPage } from './medical-history.page';

describe('MedicalHistoryPage', () => {
  let component: MedicalHistoryPage;
  let fixture: ComponentFixture<MedicalHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
