import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComplaintPage } from './complaint.page';

describe('ComplaintPage', () => {
  let component: ComplaintPage;
  let fixture: ComponentFixture<ComplaintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComplaintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
