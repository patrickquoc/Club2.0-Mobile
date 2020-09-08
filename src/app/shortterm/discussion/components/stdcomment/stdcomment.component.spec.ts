import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDCommentComponent } from './stdcomment.component';

describe('STDCommentComponent', () => {
  let component: STDCommentComponent;
  let fixture: ComponentFixture<STDCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDCommentComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
