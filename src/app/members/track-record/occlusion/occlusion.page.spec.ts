import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OcclusionPage } from './occlusion.page';

describe('OcclusionPage', () => {
  let component: OcclusionPage;
  let fixture: ComponentFixture<OcclusionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcclusionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OcclusionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
