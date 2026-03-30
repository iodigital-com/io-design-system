'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { sitemap } from '@/sitemap';

const SIDEBAR_EXPANDED_SECTIONS_KEY = 'io-sidebar-expanded-sections';

const SECTION_PRIORITY: Record<string, number> = {
  Developing: 1,
  Components: 2,
  Styles: 3,
  Designing: 4,
  Help: 5,
  News: 6,
};

const SECTION_ITEM_PRIORITY: Record<string, string[]> = {
  Components: ['Introduction'],
  Developing: ['Introduction', 'Next.js', 'React', 'Vanilla JS', 'Angular', 'Vue'],
  Styles: ['Introduction', 'Logotype', 'Colours', 'Typography', 'Spacing', 'Grid', 'Motion', 'Focus', 'Border Radius'],
};

/** Returns true when a NavItem's base path matches the current pathname. */
function isItemActive(itemHref: string, pathname: string | null): boolean {
  if (!pathname) return false;
  if (itemHref === '/') return pathname === '/';
  const base = itemHref.split('/configurator')[0];
  if (/^\/[^/]+$/.test(base)) return pathname === base || pathname.startsWith(base + '/configurator');
  return pathname === base || pathname.startsWith(base + '/');
}

export function Navigation() {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const orderedSections = useMemo(
    () =>
      [...sitemap]
        .map((section) => {
          const itemPriority = SECTION_ITEM_PRIORITY[section.title] ?? [];
          const items = [...section.items].sort((a, b) => {
            const aPriority = itemPriority.indexOf(a.label);
            const bPriority = itemPriority.indexOf(b.label);
            const aRank = aPriority === -1 ? Number.MAX_SAFE_INTEGER : aPriority;
            const bRank = bPriority === -1 ? Number.MAX_SAFE_INTEGER : bPriority;
            if (aRank !== bRank) return aRank - bRank;
            return a.label.localeCompare(b.label);
          });
          return { ...section, items };
        })
        .sort((a, b) => {
          const aPriority = SECTION_PRIORITY[a.title] ?? Number.MAX_SAFE_INTEGER;
          const bPriority = SECTION_PRIORITY[b.title] ?? Number.MAX_SAFE_INTEGER;
          if (aPriority !== bPriority) return aPriority - bPriority;
          return a.title.localeCompare(b.title);
        }),
    [],
  );

  useEffect(() => {
    const activeSectionTitles = new Set(
      orderedSections.filter((section) => section.items.some((item) => isItemActive(item.href, pathname))).map((section) => section.title),
    );

    let saved: Record<string, boolean> = {};
    try {
      const raw = window.localStorage.getItem(SIDEBAR_EXPANDED_SECTIONS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          saved = Object.fromEntries(Object.entries(parsed).map(([key, value]) => [key, Boolean(value)]));
        }
      }
    } catch {
      saved = {};
    }

    const nextState = Object.fromEntries(
      orderedSections.map((section) => [section.title, activeSectionTitles.has(section.title) || Boolean(saved[section.title])]),
    ) as Record<string, boolean>;

    setExpandedSections(nextState);
  }, [orderedSections, pathname]);

  function toggleSection(title: string) {
    setExpandedSections((prev) => {
      const next = { ...prev, [title]: !prev[title] };
      window.localStorage.setItem(SIDEBAR_EXPANDED_SECTIONS_KEY, JSON.stringify(next));
      return next;
    });
  }

  return (
    <nav className="flex-1 flex flex-col py-3" aria-label="Main navigation">
      <div className="flex-1 px-2">
        {orderedSections.map((section, sectionIndex) => {
          const hasActiveItem = section.items.some((item) => isItemActive(item.href, pathname));
          const isExpanded = hasActiveItem || Boolean(expandedSections[section.title]);
          const panelId = `nav-section-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

          return (
            <div
              key={section.title}
              className={sectionIndex === 0 ? 'mb-2' : 'mb-2 border-t border-[var(--io-border)] mt-5 pt-4'}
            >
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => toggleSection(section.title)}
                className="w-full px-2 mb-1 inline-flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[var(--io-text-muted)] hover:text-[var(--io-text-primary)]"
              >
                <span>{section.title}</span>
                <span
                  aria-hidden="true"
                  className={[
                    'text-xs leading-none transition-transform duration-200',
                    isExpanded ? 'rotate-90' : 'rotate-0',
                  ].join(' ')}
                >
                  ▸
                </span>
              </button>

              {isExpanded && (
                <ul id={panelId} className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = isItemActive(item.href, pathname);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          aria-current={active ? 'page' : undefined}
                          className={[
                            'block pl-4 pr-3 py-1.5 rounded-full text-sm transition-colors',
                            active
                              ? 'font-semibold bg-[var(--io-color-primary)] text-white'
                              : 'font-medium text-[var(--io-text-secondary)] hover:text-[var(--io-text-primary)] hover:bg-[var(--io-bg-hover)]',
                          ].join(' ')}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[var(--io-border)] mt-4 text-center">
        <span className="text-xs text-[var(--io-text-muted)]">© {new Date().getFullYear()} iO Digital</span>
      </div>
    </nav>
  );
}
