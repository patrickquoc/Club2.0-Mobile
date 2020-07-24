import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LTDDetailPage } from './ltddetail.page';

describe('LTDDetailPage', () => {
  let component: LTDDetailPage;
  let fixture: ComponentFixture<LTDDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LTDDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LTDDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
