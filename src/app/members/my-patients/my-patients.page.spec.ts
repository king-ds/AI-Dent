import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyPatientsPage } from './my-patients.page';

describe('MyPatientsPage', () => {
  let component: MyPatientsPage;
  let fixture: ComponentFixture<MyPatientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPatientsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyPatientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
