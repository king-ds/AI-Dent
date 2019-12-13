import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChildDentalChartPage } from './child-dental-chart.page';

describe('ChildDentalChartPage', () => {
  let component: ChildDentalChartPage;
  let fixture: ComponentFixture<ChildDentalChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildDentalChartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChildDentalChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
