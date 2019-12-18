import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GingivaPage } from './gingiva.page';

describe('GingivaPage', () => {
  let component: GingivaPage;
  let fixture: ComponentFixture<GingivaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GingivaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GingivaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
