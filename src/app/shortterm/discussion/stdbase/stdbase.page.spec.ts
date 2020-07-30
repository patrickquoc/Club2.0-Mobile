import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDBasePage } from './stdbase.page';

describe('STDBasePage', () => {
  let component: STDBasePage;
  let fixture: ComponentFixture<STDBasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDBasePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDBasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
