import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LTDCommentPage } from './ltdcomment.page';

describe('LTDCommentPage', () => {
  let component: LTDCommentPage;
  let fixture: ComponentFixture<LTDCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LTDCommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LTDCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
