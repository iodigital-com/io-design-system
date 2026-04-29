import { vi } from 'vitest';

await import('../../dist/io-components/io-components.esm.js');

vi.spyOn(Math, 'random').mockReturnValue(0.123456789);

if (typeof HTMLDialogElement !== 'undefined') {
	if (!HTMLDialogElement.prototype.showModal) {
		HTMLDialogElement.prototype.showModal = function showModal() {
			this.setAttribute('open', '');
		};
	}

	if (!HTMLDialogElement.prototype.close) {
		HTMLDialogElement.prototype.close = function close() {
			this.removeAttribute('open');
		};
	}
}

if (typeof MutationObserver === 'undefined') {
	globalThis.MutationObserver = class MutationObserver {
		observe() {}
		disconnect() {}
		takeRecords() {
			return [];
		}
	} as typeof MutationObserver;
}

export {};