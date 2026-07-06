'use client';

import {
  inputStoryDefault,
  inputStorySizes,
  inputStoryDateTime,
  inputStoryConstraints,
  inputStoryError,
  inputStoryDisabled,
  inputStoryIndicator,
} from '../io-input.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { FORM_PREVIEW_CLASSNAME } from '@/components/playground/preview-styles';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoInputExamplesPage() {
  return (
    <div className="space-y-10">
      <section>
        <ExamplesSectionHeader title="Default" />
        <ComponentStory story={inputStoryDefault} previewClassName={FORM_PREVIEW_CLASSNAME} />
      </section>

      <section>
        <ExamplesSectionHeader title="Sizes" description="sm, md, and lg sizes aligned with form control rhythm." />
        <ComponentStory story={inputStorySizes} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>
        <ExamplesSectionHeader title="Date and time types" description="Native date/time inputs with platform pickers and constraints." />
        <ComponentStory story={inputStoryDateTime} previewClassName="flex flex-wrap gap-4 items-end" />
      </section>

      <section>
        <ExamplesSectionHeader title="Numeric constraints" description="min, max, and step forwarded to native number/date/time inputs." />
        <ComponentStory story={inputStoryConstraints} previewClassName={FORM_PREVIEW_CLASSNAME} />
      </section>

      <section>
        <ExamplesSectionHeader title="Error state" />
        <ComponentStory story={inputStoryError} previewClassName={FORM_PREVIEW_CLASSNAME} />
      </section>

      <section>
        <ExamplesSectionHeader title="Disabled state" />
        <ComponentStory story={inputStoryDisabled} previewClassName={FORM_PREVIEW_CLASSNAME} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Type indicator icons"
          description="Set the indicator prop to a Lucide icon name to render a visual affordance in the prefix area. Useful for email, tel, and url inputs to reinforce field purpose at a glance. The icon is decorative (aria-hidden) and does not change the accessible label."
        />
        <ComponentStory story={inputStoryIndicator} previewClassName={`${FORM_PREVIEW_CLASSNAME} [&_io-input]:!max-w-[30rem]`} />
      </section>

      <section>
        <ExamplesSectionHeader
          title="RTL layout"
          description="In a right-to-left context the label anchors from the right edge and prefix/suffix slots swap sides. Wrap the page or section with dir=&quot;rtl&quot; to activate."
        />
        <div
          dir="rtl"
          className="p-4 sm:p-8 flex flex-col gap-6 rounded-lg border border-[var(--io-border)]"
          style={{ backgroundColor: 'var(--io-bg-raised)' }}
        >
          <io-input label="الاسم الكامل" placeholder="أدخل اسمك" />
          <io-input label="البريد الإلكتروني" type="email" placeholder="example@domain.com" />
          <io-input label="رقم الهاتف" type="tel" state="error" message="رقم هاتف غير صالح" />
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--io-text-muted)' }}>
          dir=&quot;rtl&quot; · label anchors right · error icon mirrors to left · prefix/suffix slots swap
        </p>
      </section>
    </div>
  );
}
