import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDCreationPage } from './stdcreation.page';

describe('STDCreationPage', () => {
  let component: STDCreationPage;
  let fixture: ComponentFixture<STDCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDCreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
