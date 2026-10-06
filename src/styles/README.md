# Global styles

This directory contains styles that apply across the entire application.

- `reset.css` normalizes browser defaults and should rarely need changes.
- `tokens.css` contains application-specific design values such as colors,
  spacing, typography, breakpoints, shadows, and border radii.
- `global.css` contains global element defaults and application-wide styles.

Styles belonging to one component or page should be placed beside that
component or page. Do not add component-specific selectors here.

Use native CSS nesting when it makes component relationships easier to read.
Nesting should remain within the component that owns the markup rather than
reaching into another component's internal structure.
