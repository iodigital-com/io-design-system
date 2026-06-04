import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main>
      <h1>io-modal — Footer Button Click Test</h1>

      <io-button (click)="openModal()">Open modal</io-button>

      <div class="result" data-testid="result">{{ result() || 'No action yet' }}</div>

      <io-modal
        [attr.open]="modalOpen() ? '' : null"
        heading="Create item"
        (dismiss)="handleCancel()"
      >
        <io-input
          label="Name"
          name="name"
          [attr.value]="name()"
          (input)="name.set($any($event.target).value)"
        ></io-input>

        <io-button
          slot="footer"
          variant="ghost"
          (click)="handleCancel()"
        >Cancel</io-button>
        <io-button
          slot="footer"
          (click)="handleSave()"
        >Save</io-button>
      </io-modal>
    </main>
  `,
})
export class ModalComponent {
  modalOpen = signal(false);
  result = signal('');
  name = signal('');

  openModal() {
    this.modalOpen.set(true);
    this.result.set('');
  }

  handleCancel() {
    this.modalOpen.set(false);
    this.result.set('cancel-clicked');
  }

  handleSave() {
    if (!this.name().trim()) {
      this.result.set('validation-error: name is required');
      return;
    }
    this.modalOpen.set(false);
    this.result.set('saved: ' + this.name());
  }
}
