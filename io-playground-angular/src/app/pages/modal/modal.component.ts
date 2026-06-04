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
        (dismiss)="handleDismiss()"
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
  private saving = false;

  openModal() {
    this.modalOpen.set(true);
    this.result.set('');
    this.name.set('');
  }

  handleCancel() {
    this.modalOpen.set(false);
    this.result.set('cancel-clicked');
  }

  // Guard: dismiss fires as side-effect when handleSave() closes the modal.
  // saving flag prevents overwriting the saved result.
  handleDismiss() {
    if (!this.saving) this.handleCancel();
    this.saving = false;
  }

  handleSave() {
    if (!this.name().trim()) {
      this.result.set('validation-error: name is required');
      return;
    }
    this.saving = true;
    this.modalOpen.set(false);
    this.result.set('saved: ' + this.name());
  }
}
