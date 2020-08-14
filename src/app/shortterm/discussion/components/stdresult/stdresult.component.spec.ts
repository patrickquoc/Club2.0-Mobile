import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDResultComponent } from './stdresult.component';

describe('STDResultComponent', () => {
  let component: STDResultComponent;
  let fixture: ComponentFixture<STDResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDResultComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
