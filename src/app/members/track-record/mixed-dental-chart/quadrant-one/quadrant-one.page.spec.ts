import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuadrantOnePage } from './quadrant-one.page';

describe('QuadrantOnePage', () => {
  let component: QuadrantOnePage;
  let fixture: ComponentFixture<QuadrantOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadrantOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuadrantOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
