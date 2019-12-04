import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClinicianViewerPage } from './clinician-viewer.page';

describe('ClinicianViewerPage', () => {
  let component: ClinicianViewerPage;
  let fixture: ComponentFixture<ClinicianViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicianViewerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClinicianViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
