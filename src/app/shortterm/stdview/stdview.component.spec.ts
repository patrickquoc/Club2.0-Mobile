import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDViewComponent } from './stdview.component';

describe('STDViewComponent', () => {
  let component: STDViewComponent;
  let fixture: ComponentFixture<STDViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDViewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
