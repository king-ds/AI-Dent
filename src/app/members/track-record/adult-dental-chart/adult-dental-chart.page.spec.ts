import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdultDentalChartPage } from './adult-dental-chart.page';

describe('AdultDentalChartPage', () => {
  let component: AdultDentalChartPage;
  let fixture: ComponentFixture<AdultDentalChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdultDentalChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdultDentalChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
