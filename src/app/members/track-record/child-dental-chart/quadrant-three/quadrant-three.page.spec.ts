import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuadrantThreePage } from './quadrant-three.page';

describe('QuadrantThreePage', () => {
  let component: QuadrantThreePage;
  let fixture: ComponentFixture<QuadrantThreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuadrantThreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QuadrantThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
