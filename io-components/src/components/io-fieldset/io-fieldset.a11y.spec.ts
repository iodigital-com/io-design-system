import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-fieldset — a11y', () => {
  it('basic fieldset/legend has no violations', async () => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = 'Shipping address';
    fieldset.appendChild(legend);
    await renderAndCheckA11y(fieldset);
  });

  it('required fieldset has no violations', async () => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = 'Contact details';
    const required = document.createElement('span');
    required.setAttribute('aria-hidden', 'true');
    required.textContent = ' *';
    legend.appendChild(required);
    fieldset.appendChild(legend);
    await renderAndCheckA11y(fieldset);
  });

  it('error fieldset with aria-describedby has no violations', async () => {
    const wrapper = document.createElement('div');
    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('aria-describedby', 'fieldset-error');

    const legend = document.createElement('legend');
    legend.textContent = 'Preferences';
    fieldset.appendChild(legend);

    const errorMsg = document.createElement('p');
    errorMsg.id = 'fieldset-error';
    errorMsg.setAttribute('role', 'alert');
    errorMsg.textContent = 'Please make a selection';

    wrapper.appendChild(fieldset);
    wrapper.appendChild(errorMsg);
    await renderAndCheckA11y(wrapper);
  });

  it('fieldset with role=radiogroup override has no violations', async () => {
    const fieldset = document.createElement('fieldset');
    fieldset.setAttribute('role', 'radiogroup');

    const legend = document.createElement('legend');
    legend.textContent = 'Delivery method';
    fieldset.appendChild(legend);

    const label1 = document.createElement('label');
    const radio1 = document.createElement('input');
    radio1.type = 'radio';
    radio1.name = 'delivery';
    radio1.value = 'standard';
    label1.appendChild(radio1);
    label1.append(' Standard');
    fieldset.appendChild(label1);

    await renderAndCheckA11y(fieldset);
  });
});
