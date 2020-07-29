import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDDetailPage } from './stddetail.page';

describe('STDDetailPage', () => {
  let component: STDDetailPage;
  let fixture: ComponentFixture<STDDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
