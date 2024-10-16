import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMensagemComponent } from './input-mensagem.component';

describe('InputMensagemComponent', () => {
  let component: InputMensagemComponent;
  let fixture: ComponentFixture<InputMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMensagemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
