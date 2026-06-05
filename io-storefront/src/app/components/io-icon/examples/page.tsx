'use client';

import {
  iconStoryAllIcons,
  iconStorySizes,
  iconStoryColour,
  iconStoryFormActions,
  iconStoryWysiwygFormat,
  iconStoryWysiwygStructure,
  iconStoryWysiwygInsert,
  iconStoryWysiwygTables,
  iconStoryWysiwygHistory,
} from '../io-icon.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoIconExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="All icons"
          description="The full set of 105 registered icons rendered at size md. Each icon is labelled for screen reader identification."
        />
        <ComponentStory
          story={iconStoryAllIcons}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Size scale"
          description="The search icon at all five sizes: xs (12 px), sm (16 px), md (20 px), lg (24 px), xl (32 px)."
        />
        <ComponentStory
          story={iconStorySizes}
          previewClassName="flex flex-wrap gap-6 items-end"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Colour inheritance"
          description="io-icon uses currentColor for stroke. Set color on a parent element or via an inline style and the icon inherits it automatically. No prop required."
        />
        <ComponentStory
          story={iconStoryColour}
          previewClassName="flex flex-wrap gap-6 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Form actions"
          description="Save, edit, delete, duplicate, and discard icons for CRUD forms and toolbar buttons."
        />
        <ComponentStory
          story={iconStoryFormActions}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="WYSIWYG — text formatting"
          description="Bold, italic, underline, strikethrough, code, highlight, and remove-formatting for rich text toolbars."
        />
        <ComponentStory
          story={iconStoryWysiwygFormat}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="WYSIWYG — headings & structure"
          description="Heading levels h1–h6, blockquote, lists (bullet, numbered, checklist, todo), indent controls, and horizontal rule."
        />
        <ComponentStory
          story={iconStoryWysiwygStructure}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="WYSIWYG — insert"
          description="Link, unlink, image, table, attachment, and code block insertion."
        />
        <ComponentStory
          story={iconStoryWysiwygInsert}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="WYSIWYG — table operations"
          description="Merge cells, split cells, split columns, split rows, table config, and table properties."
        />
        <ComponentStory
          story={iconStoryWysiwygTables}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="WYSIWYG — history & alignment"
          description="Undo, redo, text alignment (left, center, right, justify), spell check, and text cursor."
        />
        <ComponentStory
          story={iconStoryWysiwygHistory}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

    </div>
  );
}
