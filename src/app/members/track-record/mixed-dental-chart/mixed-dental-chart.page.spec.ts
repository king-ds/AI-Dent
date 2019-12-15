import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MixedDentalChartPage } from './mixed-dental-chart.page';

describe('MixedDentalChartPage', () => {
  let component: MixedDentalChartPage;
  let fixture: ComponentFixture<MixedDentalChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MixedDentalChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MixedDentalChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
