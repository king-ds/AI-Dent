import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddPatientsPage } from './add-patients.page';

describe('AddPatientsPage', () => {
  let component: AddPatientsPage;
  let fixture: ComponentFixture<AddPatientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPatientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
