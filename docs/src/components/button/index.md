---
outline: deep
---

# Button

A Native `<button />`  with batteries included for loading state, variants & many more.

!!!include(./src/_includes/title-preview.md)!!!

<wrapper src="components/button/demo" />

!!!include(./src/_includes/title-snippet.md)!!!

<<< @/components/button/ExampleButton.vue

!!!include(./src/_includes/title-props.md)!!!

| Prop           | Description                   | Accepted Values | Default    |
|:---------------|:------------------------------|:----------------|:-----------|
| `as`           | Tag to render the button      | `String`        | `'button'` |
| `label`        | Label & text for the button   | `String`        | `'button'` |
| `loading`      | Disable & Sets as loading     | `Boolean`       | `false`    |
| `disabled`     | Disable the button            | `Boolean`       | `false`    |
| `type`         | Type of the button Ex: submit | `String`        | `'button'` |
| `focusOnMount` | Auto-focus on mount           | `Boolean`       | `false`    |


!!!include(./src/_includes/title-slots.md)!!!

### Slot `default`

Default slot, overrides everything inside the button, please beware that this will disable the loading and disable states

### Slot `icon`

Appends an icon, allowing an icon to be inserted together with the loading state

### Slot `label`

Label to use inside the button, as you would expect from a normal button

!!!include(./src/_includes/title-events.md)!!!

| Event   | Description             | Value     |
|:--------|:------------------------|:----------|
| `click` | When element is clicked | `Boolean` |







