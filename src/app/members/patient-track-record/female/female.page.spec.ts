import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FemalePage } from './female.page';

describe('FemalePage', () => {
  let component: FemalePage;
  let fixture: ComponentFixture<FemalePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FemalePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FemalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
