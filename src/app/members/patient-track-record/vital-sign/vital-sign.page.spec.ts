import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VitalSignPage } from './vital-sign.page';

describe('VitalSignPage', () => {
  let component: VitalSignPage;
  let fixture: ComponentFixture<VitalSignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitalSignPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VitalSignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
