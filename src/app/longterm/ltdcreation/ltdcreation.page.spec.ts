import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LTDCreationPage } from './ltdcreation.page';

describe('LTDCreationPage', () => {
  let component: LTDCreationPage;
  let fixture: ComponentFixture<LTDCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LTDCreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LTDCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
