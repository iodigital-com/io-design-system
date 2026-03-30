'use client';

import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import type { PropDefinition } from '@/models/propDefinition';
import type { StoryState } from '@/models/story';
import type { HTMLTagOrComponent } from '@/utils/generator/generator';
import { useSidebar } from '@/context/SidebarContext';

// ── Types ─────────────────────────────────────────────────────────────────────

type Props = {
  propDefinitions: PropDefinition[];
  storyState: StoryState<HTMLTagOrComponent>;
  setStoryState: Dispatch<SetStateAction<StoryState<HTMLTagOrComponent>>>;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

/** camelCase / lowercase → "Sentence case with spaces" */
function formatLabel(name: string): string {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

/** Segment select options at this threshold: ≤ threshold → segmented, else → dropdown */
const SEGMENTED_THRESHOLD = 5;

function buildResetProperties(defs: PropDefinition[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const def of defs) {
    if (def.defaultValue !== undefined) {
      out[def.name] = def.defaultValue;
    } else if (def.type === 'boolean') out[def.name] = false;
    else if (def.type === 'number') out[def.name] = 0;
    else if (def.type === 'select') out[def.name] = def.options[0];
    else out[def.name] = '';
  }
  return out;
}

// ── Primitive controls ────────────────────────────────────────────────────────

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--io-border-focus)] focus-visible:ring-offset-1 rounded-full cursor-pointer"
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        width: '36px',
        height: '20px',
        borderRadius: '10px',
        border: 'none',
        padding: 0,
        transition: 'background-color 200ms ease',
        backgroundColor: checked ? 'var(--io-accent)' : 'var(--io-border-hover, #c4c4c4)',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: '14px',
          height: '14px',
          borderRadius: '7px',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
          transition: 'left 200ms ease',
          left: checked ? '19px' : '3px',
          top: '3px',
        }}
      />
    </button>
  );
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="flex rounded-lg p-0.5 gap-0.5"
      style={{
        background: 'var(--io-bg-surface)',
        border: '1px solid var(--io-border)',
      }}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            title={opt}
            className="flex-1 min-w-0 rounded-md text-xs font-medium transition-all cursor-pointer truncate"
            style={{
              padding: '4px 6px',
              background: active ? 'var(--io-bg-base)' : 'transparent',
              color: active ? 'var(--io-text-primary)' : 'var(--io-text-secondary)',
              boxShadow: active ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
              border: 'none',
              lineHeight: '1.4',
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function StyledSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="io-keyboard-focus-ring w-full cursor-pointer rounded-md text-xs"
        style={{
          appearance: 'none',
          WebkitAppearance: 'none',
          height: '32px',
          padding: '0 28px 0 10px',
          background: 'var(--io-bg-surface)',
          border: '1px solid var(--io-border)',
          color: 'var(--io-text-primary)',
          fontFamily: 'inherit',
          fontWeight: 500,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23747474' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function StyledInput({
  type,
  value,
  onChange,
}: {
  type: 'text' | 'number';
  value: string | number;
  onChange: (v: string | number) => void;
}) {
  return (
    <input
      type={type}
      value={value as string}
      onChange={(e) =>
        onChange(type === 'number' ? e.target.valueAsNumber : e.target.value)
      }
      className="io-keyboard-focus-ring w-full rounded-md text-xs"
      style={{
        height: '32px',
        padding: '0 10px',
        background: 'var(--io-bg-surface)',
        border: '1px solid var(--io-border)',
        color: 'var(--io-text-primary)',
        fontFamily: 'inherit',
        fontWeight: 500,
      }}
    />
  );
}

// ── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-2 pt-4 pb-2"
      style={{ borderTop: '1px solid var(--io-border)' }}
    >
      <span
        className="text-[10px] font-semibold uppercase tracking-widest"
        style={{ color: 'var(--io-text-muted)', letterSpacing: '0.1em' }}
      >
        {label}
      </span>
    </div>
  );
}

function getPropertyDescription(def: PropDefinition, label: string): string {
  if (def.description?.trim()) return def.description.trim();
  return `Configures ${label.toLowerCase()}.`;
}

function DescriptionTrigger({ label, description }: { label: string; description: string }) {
  return (
    <io-tooltip content={description} placement="top">
      <button
        type="button"
        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[var(--io-text-muted)] hover:text-[var(--io-text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--io-border-focus)]"
        aria-label={`Show description for ${label}`}
      >
        <span className="sr-only">Show description for {label}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="10" x2="12" y2="16" />
          <circle cx="12" cy="7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
      </button>
    </io-tooltip>
  );
}

// ── Control row ───────────────────────────────────────────────────────────────

function ControlRow({ def, value, onUpdate }: {
  def: PropDefinition;
  value: unknown;
  onUpdate: (name: string, val: unknown) => void;
}) {
  const label = formatLabel(def.name);
  const description = getPropertyDescription(def, label);

  if (def.type === 'boolean') {
    const checked = Boolean(value ?? def.defaultValue ?? false);
    return (
      <div className="flex items-center justify-between gap-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <span
            className="text-[13px] font-medium select-none"
            style={{ color: 'var(--io-text-primary)' }}
          >
            {label}
          </span>
          <DescriptionTrigger label={label} description={description} />
        </div>
        <ToggleSwitch
          checked={checked}
          onChange={(v) => onUpdate(def.name, v)}
        />
      </div>
    );
  }

  if (def.type === 'select') {
    const val = String(value ?? def.defaultValue ?? def.options[0]);
    const useSegmented = def.options.length <= SEGMENTED_THRESHOLD;
    return (
      <div className="space-y-1.5 py-1">
        <div className="flex items-center gap-1.5">
          <label
            className="block text-[11px] font-medium"
            style={{ color: 'var(--io-text-secondary)', letterSpacing: '0.01em' }}
          >
            {label}
          </label>
          <DescriptionTrigger label={label} description={description} />
        </div>
        {useSegmented ? (
          <SegmentedControl
            options={def.options}
            value={val}
            onChange={(v) => onUpdate(def.name, v)}
          />
        ) : (
          <StyledSelect
            value={val}
            options={def.options}
            onChange={(v) => onUpdate(def.name, v)}
          />
        )}
      </div>
    );
  }

  if (def.type === 'number') {
    return (
      <div className="space-y-1.5 py-1">
        <div className="flex items-center gap-1.5">
          <label
            className="block text-[11px] font-medium"
            style={{ color: 'var(--io-text-secondary)', letterSpacing: '0.01em' }}
          >
            {label}
          </label>
          <DescriptionTrigger label={label} description={description} />
        </div>
        <StyledInput
          type="number"
          value={Number(value ?? def.defaultValue ?? 0)}
          onChange={(v) => onUpdate(def.name, v)}
        />
      </div>
    );
  }

  if (def.type === 'string') {
    return (
      <div className="space-y-1.5 py-1">
        <div className="flex items-center gap-1.5">
          <label
            className="block text-[11px] font-medium"
            style={{ color: 'var(--io-text-secondary)', letterSpacing: '0.01em' }}
          >
            {label}
          </label>
          <DescriptionTrigger label={label} description={description} />
        </div>
        <StyledInput
          type="text"
          value={String(value ?? def.defaultValue ?? '')}
          onChange={(v) => onUpdate(def.name, v)}
        />
      </div>
    );
  }

  return null;
}

// ── Reset icon ────────────────────────────────────────────────────────────────

function ResetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

/**
 * ConfiguratorControls — portals a prop-control panel into `#io-sidebar-end`.
 * Groups props by their `group` field. Ungrouped props render first with no label.
 */
export function ConfiguratorControls({ propDefinitions, storyState, setStoryState }: Props) {
  const { isSidebarEndOpen } = useSidebar();
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(isSidebarEndOpen ? document.getElementById('io-sidebar-end') : null);
  }, [isSidebarEndOpen]);

  if (!portalTarget) return null;

  const props = storyState.properties ?? {};

  function update(name: string, value: unknown) {
    setStoryState((prev) => ({
      ...prev,
      properties: { ...(prev.properties ?? {}), [name]: value },
    }));
  }

  function reset() {
    setStoryState((prev) => ({
      ...prev,
      properties: buildResetProperties(propDefinitions),
    }));
  }

  // Group props — preserve definition order within each group
  const grouped = new Map<string, PropDefinition[]>();
  const UNGROUPED = '__ungrouped__';
  for (const def of propDefinitions) {
    const key = def.group ?? UNGROUPED;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(def);
  }

  const controls = (
    <div className="flex flex-col h-full">
      {/* ── Panel header ─────────────────────────────────────── */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderBottom: '1px solid var(--io-border)' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="block w-[3px] h-[14px] rounded-full shrink-0"
            style={{ backgroundColor: 'var(--io-accent)' }}
            aria-hidden="true"
          />
          <span
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--io-text-primary)', letterSpacing: '0.1em' }}
          >
            Properties
          </span>
          <span
            className="text-[10px] font-semibold tabular-nums px-1.5 py-0.5 rounded-full"
            style={{
              background: 'var(--io-bg-surface)',
              color: 'var(--io-text-muted)',
              border: '1px solid var(--io-border)',
            }}
          >
            {propDefinitions.length}
          </span>
        </div>
        <button
          onClick={reset}
          title="Reset to defaults"
          aria-label="Reset all properties to defaults"
          className="flex items-center gap-1.5 cursor-pointer rounded-md transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--io-border-focus)]"
          style={{
            padding: '4px 8px',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--io-text-secondary)',
            background: 'transparent',
            border: '1px solid var(--io-border)',
            borderRadius: '6px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--io-text-primary)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--io-border-hover)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--io-text-secondary)';
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--io-border)';
          }}
        >
          <ResetIcon />
          Reset
        </button>
      </div>

      {/* ── Controls ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {Array.from(grouped.entries()).map(([groupKey, defs], groupIndex) => (
          <div key={groupKey}>
            {groupKey !== UNGROUPED && (
              <SectionLabel label={groupKey} />
            )}
            {groupKey === UNGROUPED && groupIndex === 0 && (
              <div className="pt-3" />
            )}
            {defs.map((def) => (
              <ControlRow
                key={def.name}
                def={def}
                value={props[def.name]}
                onUpdate={update}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return createPortal(controls, portalTarget);
}
