import { Component, signal, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [JsonPipe],
  template: `
    <main>
      <h1>Forms — FACE Participation Test</h1>
      <form #formEl (submit)="handleSubmit($event)" style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <io-input label="Full name" name="name" required></io-input>
        <io-input label="Email" name="email" type="email" required></io-input>
        <io-select label="Role" name="role">
          <option value="">Select role</option>
          <option value="dev">Developer</option>
          <option value="design">Designer</option>
        </io-select>
        <io-checkbox label="I agree to terms" name="terms" value="on" required></io-checkbox>
        <!-- Use native button so shadow-DOM io-button can't intercept form submission -->
        <button type="submit" class="submit-btn">Submit</button>
      </form>
      @if (submitted()) {
        <div class="result" data-testid="result">
          <pre>{{ submitted() | json }}</pre>
        </div>
      }
    </main>
  `,
  styles: [`
    .submit-btn {
      padding: 0.5rem 1rem;
      background: var(--io-color-primary, #0000D2);
      color: white;
      border: none;
      border-radius: 9px;
      cursor: pointer;
      font-size: 0.875rem;
    }
  `],
})
export class FormComponent {
  submitted = signal<Record<string, FormDataEntryValue> | null>(null);

  handleSubmit(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    // Sync name/value attributes for FACE elements (Angular sets as properties)
    form.querySelectorAll('io-input, io-checkbox, io-radio, io-select').forEach((el: any) => {
      if (el.name && !el.getAttribute('name')) el.setAttribute('name', el.name);
      if (el.tagName === 'IO-RADIO' && el.value && !el.getAttribute('value'))
        el.setAttribute('value', el.value);
    });
    const data = new FormData(form);
    this.submitted.set(Object.fromEntries(data.entries()));
  }
}
