'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoCheckboxGroupApiPage() {
  return (
    <div className="space-y-16">

      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-checkbox-group Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '180px' },
            { label: 'Type', width: '180px' },
            { label: 'Default', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n"><InlineCode>label</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'Legend text for the fieldset — the accessible group name. Rendered as a native <legend> element. Must always be set.',
            ],
            [
              <span key="n"><InlineCode>name</InlineCode></span>,
              <InlineCode key="t">string</InlineCode>,
              <span key="d" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>required</span>,
              'HTML name attribute propagated to every slotted io-checkbox child. Groups the checkboxes for correct form submission.',
            ],
            [
              <InlineCode key="n">helperText</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Supporting guidance shown below the legend.',
            ],
            [
              <InlineCode key="n">required</InlineCode>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Marks the group as required.',
            ],
            [
              <span key="n"><InlineCode>disabled</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Disables the entire group. Propagated to all child io-checkbox elements. The native fieldset disabled attribute is set.',
            ],
            [
              <span key="n"><InlineCode>state</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;none&apos; | &apos;error&apos; | &apos;success&apos; | &apos;warning&apos;</InlineCode>,
              <InlineCode key="d">&apos;none&apos;</InlineCode>,
              'Validation state — controls border and message colour. Apply message alongside this to provide accessible feedback.',
            ],
            [
              <InlineCode key="n">message</InlineCode>,
              <InlineCode key="t">string</InlineCode>,
              <InlineCode key="d">&apos;&apos;</InlineCode>,
              'Validation/helper message shown below the group. Rendered as a paragraph with role="alert" (state="error") or role="status" (other states), and linked to the fieldset via aria-describedby when state is error.',
            ],
            [
              <span key="n"><InlineCode>orientation</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">&apos;vertical&apos; | &apos;horizontal&apos;</InlineCode>,
              <InlineCode key="d">&apos;vertical&apos;</InlineCode>,
              'Layout direction of the checkbox options. Horizontal wraps items in a row with additional gap.',
            ],
            [
              <span key="n"><InlineCode>loading</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              'Shows a loading spinner overlay over the options and blocks interaction via the inert attribute. Sets aria-busy="true" on the host.',
            ],
            [
              <InlineCode key="n">aria</InlineCode>,
              <InlineCode key="t">{'Record<string, string>'}</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              'Arbitrary ARIA attributes spread onto the fieldset element. Keys may omit or include the aria- prefix. Component-managed attributes (aria-invalid, aria-describedby when state is error) take precedence and cannot be overridden.',
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-checkbox-group."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '240px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">change</InlineCode>,
              <InlineCode key="t">{'{ checkedValues: string[] }'}</InlineCode>,
              'Yes',
              'Fires when any child io-checkbox changes state. detail.checkedValues is an array of all currently checked option values across the group.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// Vanilla JS
document.querySelector('io-checkbox-group')
  .addEventListener('change', (e) => {
    console.log('checked:', e.detail.checkedValues);
  });

// React
<IoCheckboxGroup
  label="Notification channels"
  name="notifications"
  onChange={(e) => setChecked(e.detail.checkedValues)}
>
  <IoCheckbox label="Email" value="email" />
  <IoCheckbox label="SMS" value="sms" />
  <IoCheckbox label="Push" value="push" />
</IoCheckboxGroup>

// Angular
<io-checkbox-group label="Notification channels" name="notifications" (change)="onNotificationsChange($event)">
  <io-checkbox label="Email" value="email"></io-checkbox>
  <io-checkbox label="SMS" value="sms"></io-checkbox>
  <io-checkbox label="Push" value="push"></io-checkbox>
</io-checkbox-group>

// Vue
<io-checkbox-group label="Notification channels" name="notifications" @change="handleNotificationsChange">
  <io-checkbox label="Email" value="email" />
  <io-checkbox label="SMS" value="sms" />
  <io-checkbox label="Push" value="push" />
</io-checkbox-group>`}
        </CodeNote>
      </section>

      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="Content slots available on io-checkbox-group."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n" style={{ color: 'var(--io-text-muted)', fontStyle: 'italic' }}>default</span>,
              'Slot for io-checkbox child elements. The group propagates name and disabled state to all slotted io-checkbox elements on load and on slotchange.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`<io-checkbox-group label="Dietary requirements" name="dietary" helper-text="Select all that apply.">
  <io-checkbox label="Vegetarian" value="vegetarian"></io-checkbox>
  <io-checkbox label="Vegan" value="vegan"></io-checkbox>
  <io-checkbox label="Gluten-free" value="gluten-free"></io-checkbox>
  <io-checkbox label="Dairy-free" value="dairy-free"></io-checkbox>
</io-checkbox-group>`}
        </CodeNote>
      </section>

    </div>
  );
}
