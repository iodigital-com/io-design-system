'use client';

import { SectionHeader, RuleCard } from '../../../../components/accessibility/AccessibilityPrimitives';

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
