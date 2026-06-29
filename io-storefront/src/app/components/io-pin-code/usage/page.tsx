'use client';

import { SectionHeader, RuleCard } from '../../../../components/usage/UsagePrimitives';

export default function IoPinCodeUsagePage() {
  return (
    <div className="space-y-16">
      <section id="when-to-use" className="space-y-6">
        <SectionHeader
          title="When to use"
          description="Use io-pin-code whenever users must enter a short numeric code as a single logical unit."
        />
        <RuleCard label="PIN authentication">
          Account PINs, card PINs, and device unlock codes where the user knows a fixed numeric secret.
        </RuleCard>
        <RuleCard label="One-time passwords (OTP)">
          SMS or authenticator-app codes. Use length=6 and consider auto-submitting on completion via the change event.
        </RuleCard>
        <RuleCard label="Step verification">
          Multi-factor authentication flows where the PIN is a secondary factor after password entry.
        </RuleCard>
      </section>

      <section id="when-not-to-use" className="space-y-6">
        <SectionHeader
          title="When not to use"
          description="Avoid io-pin-code in these contexts."
        />
        <RuleCard label="Alphanumeric codes">
          io-pin-code accepts digits only. For codes mixing letters and numbers use io-input with an appropriate pattern.
        </RuleCard>
        <RuleCard label="Long codes (7+ characters)">
          For codes longer than 6 digits a standard text input is more practical. io-pin-code is optimised for 4 or 6 slots.
        </RuleCard>
        <RuleCard label="Free-form text entry">
          io-pin-code is not a general text input. Use io-input or io-textarea for prose entry.
        </RuleCard>
      </section>

      <section id="type-prop" className="space-y-6">
        <SectionHeader
          title="type prop"
          description="Controls how digits are rendered — visible or masked."
        />
        <RuleCard label='type="number" (default)'>
          Digits are displayed as plain text. Suitable for PINs where the user can see what they are entering,
          or in environments where shoulder-surfing is not a concern.
        </RuleCard>
        <RuleCard label='type="password"'>
          Digits are masked immediately after entry. Use for PINs on shared screens or high-security flows.
          Note: the underlying input type remains <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>text</code> with
          {' '}<code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>inputMode="numeric"</code>{' '}
          to retain the numeric keyboard on mobile while masking the display.
        </RuleCard>
      </section>

      <section id="state-prop" className="space-y-6">
        <SectionHeader
          title="state prop"
          description="Visual validation feedback matching the other io form-field components."
        />
        <RuleCard label='state="none" (default)'>
          No validation styling. Suitable for unevaluated or neutral fields.
        </RuleCard>
        <RuleCard label='state="error"'>
          Slot borders turn red. Pair with a message prop to explain the error (e.g. &quot;Invalid code. Please try again.&quot;).
        </RuleCard>
        <RuleCard label='state="success"'>
          Slot borders turn green. Use after successful server-side validation to confirm the code was accepted.
        </RuleCard>
        <RuleCard label='state="warning"'>
          Slot borders turn amber. Use for caution states such as &quot;Only 1 attempt remaining&quot;.
        </RuleCard>
      </section>

      <section id="auto-advance" className="space-y-6">
        <SectionHeader
          title="Auto-advance behaviour"
          description="io-pin-code moves focus automatically as the user types or deletes."
        />
        <RuleCard label="Forward on digit entry">
          After a digit is entered in a slot, focus moves to the next empty slot automatically. No extra
          interaction is required from the user.
        </RuleCard>
        <RuleCard label="Backward on Backspace">
          Pressing Backspace on an empty slot deletes the previous digit and moves focus back one slot.
          Pressing Backspace on a filled slot clears that slot without moving focus.
        </RuleCard>
        <RuleCard label="Programmatic focus via setFocus()">
          Call the <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>setFocus()</code> method
          to programmatically focus the first empty slot (or the last slot if all are filled). Useful after
          displaying an error state to bring the user back to the input.
        </RuleCard>
      </section>

      <section id="paste-handling" className="space-y-6">
        <SectionHeader
          title="Paste handling"
          description="Users can paste a full PIN code into any slot."
        />
        <RuleCard label="Full-code paste">
          Pasting a string of digits into any slot distributes the digits across all slots starting from
          the pasted slot. Extra characters are ignored. This matches the expected behaviour for OTP
          auto-fill from SMS or password managers.
        </RuleCard>
        <RuleCard label="autocomplete=one-time-code">
          io-pin-code sets <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>autocomplete=&quot;one-time-code&quot;</code> on
          each slot so that operating systems can offer to autofill OTP codes from SMS.
        </RuleCard>
      </section>

      <section id="form-integration" className="space-y-6">
        <SectionHeader
          title="Form integration"
          description="io-pin-code is FACE form-associated and participates in native HTML forms."
        />
        <RuleCard label="name prop required for form submission">
          Set the name prop to include the PIN value in FormData on submit. Without name the field is skipped.
        </RuleCard>
        <RuleCard label="required and validity">
          When required=true the component reports valueMissing until all slots are filled. Native browser validation
          and constraint validation API (checkValidity, reportValidity) both work.
        </RuleCard>
        <RuleCard label="formResetCallback">
          Resetting a parent form clears all slots and restores the original value prop. No manual reset logic needed.
        </RuleCard>
      </section>
    </div>
  );
}
