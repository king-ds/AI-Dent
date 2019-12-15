import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuadrantTwoPage } from './quadrant-two.page';

describe('QuadrantTwoPage', () => {
  let component: QuadrantTwoPage;
  let fixture: ComponentFixture<QuadrantTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadrantTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuadrantTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
