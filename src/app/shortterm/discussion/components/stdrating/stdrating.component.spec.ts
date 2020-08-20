import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDRatingComponent } from './stdrating.component';

describe('STDRatingComponent', () => {
  let component: STDRatingComponent;
  let fixture: ComponentFixture<STDRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDRatingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
