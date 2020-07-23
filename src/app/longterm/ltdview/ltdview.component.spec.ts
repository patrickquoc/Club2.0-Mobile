import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LTDViewComponent } from './ltdview.component';

describe('LTDViewComponent', () => {
  let component: LTDViewComponent;
  let fixture: ComponentFixture<LTDViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LTDViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LTDViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
