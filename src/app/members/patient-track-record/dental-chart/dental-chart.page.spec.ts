import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DentalChartPage } from './dental-chart.page';

describe('DentalChartPage', () => {
  let component: DentalChartPage;
  let fixture: ComponentFixture<DentalChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DentalChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DentalChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
