import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuadrantFourPage } from './quadrant-four.page';

describe('QuadrantFourPage', () => {
  let component: QuadrantFourPage;
  let fixture: ComponentFixture<QuadrantFourPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadrantFourPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuadrantFourPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
