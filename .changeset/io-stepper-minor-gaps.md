---
"@iodigital-com/components": minor
---

feat(io-stepper): button wrapper, stepChange event, ariaLabel, warning state, disabled step (#656)

- WCAG 2.1.1/4.1.2: io-step now renders inner <button> for keyboard accessibility
- Adds stepChange event on io-stepper for consumer navigation callbacks
- Adds ariaLabel prop on io-stepper for i18n override of nav landmark
- Adds warning status to IoStepStatus for multi-step validation feedback
- Adds disabled prop to io-step for blocking navigation during async operations
