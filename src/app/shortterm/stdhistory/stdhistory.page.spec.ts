import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDHistoryPage } from './stdhistory.page';

describe('STDHistoryPage', () => {
  let component: STDHistoryPage;
  let fixture: ComponentFixture<STDHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
