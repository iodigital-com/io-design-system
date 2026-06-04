import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [JsonPipe],
  template: `
    <main>
      <h1>Forms — FACE Participation Test</h1>
      <form (submit)="handleSubmit($event)" style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <io-input label="Full name" name="name" required></io-input>
        <io-input label="Email" name="email" type="email" required></io-input>
        <io-select label="Role" name="role">
          <option value="">Select role</option>
          <option value="dev">Developer</option>
          <option value="design">Designer</option>
        </io-select>
        <io-checkbox label="I agree to terms" name="terms" required></io-checkbox>
        <io-button type="submit">Submit</io-button>
      </form>
      @if (submitted()) {
        <div class="result" data-testid="result">
          <pre>{{ submitted() | json }}</pre>
        </div>
      }
    </main>
  `,
})
export class FormComponent {
  submitted = signal<Record<string, FormDataEntryValue> | null>(null);

  handleSubmit(e: Event) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    this.submitted.set(Object.fromEntries(data.entries()));
  }
}
