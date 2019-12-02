import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InstructorDashboardPage } from './instructor-dashboard.page';

describe('InstructorDashboardPage', () => {
  let component: InstructorDashboardPage;
  let fixture: ComponentFixture<InstructorDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
