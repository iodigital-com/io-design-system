'use client';

import {
  iconStoryAllIcons,
  iconStorySizes,
  iconStoryColour,
  iconStoryInheritSize,
  iconStoryFixedWidth,
  iconStoryFormActions,
  iconStoryWysiwygFormat,
  iconStoryWysiwygStructure,
  iconStoryWysiwygInsert,
  iconStoryWysiwygTables,
  iconStoryWysiwygHistory,
  iconStoryAccessibility,
  iconStoryAccountsAccess,
  iconStoryArrows,
  iconStoryBuildings,
  iconStoryCharts,
  iconStoryDesign,
  iconStoryDevelopment,
  iconStoryFiles,
  iconStoryFinance,
  iconStoryLayout,
  iconStoryMail,
  iconStoryMultimedia,
  iconStoryNavigation,
  iconStoryNotifications,
  iconStoryPhotography,
  iconStorySecurity,
  iconStoryText,
  iconStoryTime,
  iconStoryTransportation,
  iconStoryTravel,
  iconStoryWeather,
} from '../io-icon.stories';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import { ComponentStory } from '@/components/playground/ComponentStory';

export default function IoIconExamplesPage() {
  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader
          title="All icons"
          description="The full set of 455 registered icons rendered at size md. Each icon is labelled for screen reader identification."
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
          title="Inherit size"
          description='size="inherit" scales the icon to match the parent element\'s font-size. Useful for placing icons inline with text at any size without a separate prop override.'
        />
        <ComponentStory
          story={iconStoryInheritSize}
          previewClassName="flex flex-wrap gap-6 items-end"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Fixed width"
          description="fixedWidth forces the host element width to match the icon size. Use in navigation menus and icon lists to keep icon columns aligned regardless of icon shape."
        />
        <ComponentStory
          story={iconStoryFixedWidth}
          previewClassName="flex flex-col gap-2 items-start"
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
          description="Heading levels h1–h6, blockquote, lists, indent controls, and horizontal rule."
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
          description="Undo, redo, text alignment, spell check, and text cursor."
        />
        <ComponentStory
          story={iconStoryWysiwygHistory}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Accessibility"
          description="Universal design icons: screen reader, zoom, contrast, motion controls."
        />
        <ComponentStory
          story={iconStoryAccessibility}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Accounts & access"
          description="User management, authentication, permissions, bookmarks, and wallet icons."
        />
        <ComponentStory
          story={iconStoryAccountsAccess}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Arrows"
          description="Navigation arrows, directional indicators, refresh, undo/redo, and trend arrows."
        />
        <ComponentStory
          story={iconStoryArrows}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Buildings"
          description="Architectural and institutional building icons."
        />
        <ComponentStory
          story={iconStoryBuildings}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Charts"
          description="Data visualisation: bar, line, pie, area, scatter, candlestick, gantt, and kanban."
        />
        <ComponentStory
          story={iconStoryCharts}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Design"
          description="Layout, grid, drawing, and visual design tool icons."
        />
        <ComponentStory
          story={iconStoryDesign}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Development"
          description="Code, database, git, server, and developer tooling icons."
        />
        <ComponentStory
          story={iconStoryDevelopment}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Files"
          description="File types, folder management, archive, import, and spreadsheet icons."
        />
        <ComponentStory
          story={iconStoryFiles}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Finance"
          description="Currency, payment, banking, and financial indicator icons."
        />
        <ComponentStory
          story={iconStoryFinance}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Layout"
          description="Panel, grid, column, row, and interface layout controls."
        />
        <ComponentStory
          story={iconStoryLayout}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Mail"
          description="Email actions: send, reply, forward, mailbox, and inbox icons."
        />
        <ComponentStory
          story={iconStoryMail}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Multimedia"
          description="Audio, video, playback, broadcast, and media library icons."
        />
        <ComponentStory
          story={iconStoryMultimedia}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Navigation"
          description="Maps, globe, compass, routing, and geolocation icons."
        />
        <ComponentStory
          story={iconStoryNavigation}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Notifications"
          description="Alerts, status indicators, and notification state icons."
        />
        <ComponentStory
          story={iconStoryNotifications}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Photography"
          description="Camera, gallery, focus, aperture, and image capture icons."
        />
        <ComponentStory
          story={iconStoryPhotography}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Security"
          description="Lock, key, shield, vault, door, and access control icons."
        />
        <ComponentStory
          story={iconStorySecurity}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Text"
          description="Clipboard, hash, notebook, signatures, and typography utility icons."
        />
        <ComponentStory
          story={iconStoryText}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Time & calendar"
          description="Clocks, calendars, alarms, timers, and scheduling icons."
        />
        <ComponentStory
          story={iconStoryTime}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Transportation"
          description="Vehicles, transit modes, fuel, and logistics icons."
        />
        <ComponentStory
          story={iconStoryTransportation}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Travel"
          description="Luggage, map pins, and travel essentials."
        />
        <ComponentStory
          story={iconStoryTravel}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

      <section>
        <ExamplesSectionHeader
          title="Weather"
          description="Sun, cloud, rain, wind, temperature, and seasonal weather icons."
        />
        <ComponentStory
          story={iconStoryWeather}
          previewClassName="flex flex-wrap gap-4 items-center"
        />
      </section>

    </div>
  );
}
