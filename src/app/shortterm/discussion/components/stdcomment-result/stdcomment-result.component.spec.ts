import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { STDCommentResultComponent } from './stdcomment-result.component';

describe('STDCommentResultComponent', () => {
  let component: STDCommentResultComponent;
  let fixture: ComponentFixture<STDCommentResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ STDCommentResultComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(STDCommentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
