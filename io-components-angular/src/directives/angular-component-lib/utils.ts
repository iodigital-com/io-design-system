/* eslint-disable */
/* tslint:disable */
import { fromEvent } from 'rxjs';

export const proxyInputs = (Cmp: any, inputs: string[], booleanInputs: string[] = []) => {
  const Prototype = Cmp.prototype;
  const booleanSet = new Set(booleanInputs);
  inputs.forEach((item) => {
    Object.defineProperty(Prototype, item, {
      get() {
        return this.el[item];
      },
      set(val: any) {
        this.z.runOutsideAngular(() => {
          // Coerce empty string to true for boolean props — Angular passes "" when a
          // static attribute (e.g. <io-button hideLabel>) is used without property
          // binding brackets.
          const coerced = booleanSet.has(item) && val === '' ? true : val;
          (this.el as any)[item] = coerced;
        });
      },
      /**
       * In the event that proxyInputs is called
       * multiple times re-defining these inputs
       * will cause an error to be thrown. As a result
       * we set configurable: true to indicate these
       * properties can be changed.
       */
      configurable: true,
    });
  });
};

export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype;
  methods.forEach((methodName) => {
    Prototype[methodName] = function () {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};

export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach((eventName) => (instance[eventName] = fromEvent(el, eventName)));
};

export const defineCustomElement = (tagName: string, customElement: any) => {
  if (customElement !== undefined && typeof customElements !== 'undefined' && !customElements.get(tagName)) {
    customElements.define(tagName, customElement);
  }
};

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp(opts: { defineCustomElementFn?: () => void; inputs?: any; booleanInputs?: string[]; methods?: any }) {
  const decorator = function (cls: any) {
    const { defineCustomElementFn, inputs, booleanInputs, methods } = opts;

    if (defineCustomElementFn !== undefined) {
      defineCustomElementFn();
    }

    if (inputs) {
      proxyInputs(cls, inputs, booleanInputs ?? []);
    }
    if (methods) {
      proxyMethods(cls, methods);
    }
    return cls;
  };
  return decorator;
}
