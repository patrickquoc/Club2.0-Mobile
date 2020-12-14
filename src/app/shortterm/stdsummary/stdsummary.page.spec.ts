import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDSummaryPage } from './stdsummary.page';

describe('STDSummaryPage', () => {
  let component: STDSummaryPage;
  let fixture: ComponentFixture<STDSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDSummaryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
