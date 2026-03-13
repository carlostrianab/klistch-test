
# Shopify PDP Enhancements – Technical Assignment

This project implements three Product Detail Page (PDP) enhancements using Shopify theme code.

Features implemented:

1. **Build Your Routine** bundle builder
2. **Variant-aware Benefits & Ingredients panel**
3. **Sticky Add-to-Cart bar**

The solution prioritizes:

- metafield-driven rendering
- maintainable architecture
- accessibility
- Shopify-native APIs
- resilient JavaScript state management

Technologies used:

- Liquid
- Alpine.js
- Vanilla JavaScript
- Shopify AJAX API
- Shopify Section Rendering API
- CSS

---

# Architecture Overview

The PDP enhancements are structured around **three layers**:

### 1. Data Layer
Metaobjects and metafields define product routine configuration and informational content.

### 2. Liquid Rendering Layer
Shopify sections and snippets render the UI using metafield data.

### 3. JavaScript Interaction Layer
Alpine.js manages UI state and dynamic behaviors such as:

- routine selections
- tab switching
- sticky ATC visibility
- cart updates

---

# Project Structure

assets/
  routine-state.js
  benefits-tabs.js
  pdp-enhancements.css

sections/
  main-product.liquid
  routine-builder.liquid

snippets/
  routine-product-card.liquid
  benefits-ingredients-panel.liquid
  custom-sticky-add-to-cart.liquid

---

# Feature 1 — Build Your Routine

## Overview

The **Build Your Routine** module allows customers to select products across multiple steps and add them to the cart in a single action.

The routine configuration is defined through **Shopify metaobjects**.

## Data Source

product.metafields.custom.build_your_routine

This metafield references a Routine metaobject.

Example structure:

Routine
  title
  description
  steps

Each step contains:

Step
  title
  description
  products (product references)

## Section Implementation

The routine builder is implemented as:

sections/routine-builder.liquid

Steps are rendered dynamically from the metaobject configuration.

## Product Cards

Products are rendered using:

snippets/routine-product-card.liquid

Each card:

- displays product image
- displays product title
- displays product price
- tracks selection state

Selections dispatch Alpine events:

toggle-product

## State Management

State is handled with Alpine.js.

Main component:

x-data="RoutineBuilder"

Selected products are stored in:

selectedItems = []

Each item structure:

{
  id: product_id,
  variant_id: variant_id
}

## Cart Integration

Products are added to the cart using Shopify AJAX API:

POST /cart/add.js

Batch request example:

{
  items: [
    { id: variant_id, quantity: 1 }
  ]
}

## Cart UI Updates

After adding items:

- cart drawer refreshes
- header cart count updates

Using Shopify **Section Rendering API**.

Updated sections:

cart-drawer  
header

---

# Feature 2 — Benefits & Ingredients Panel

## Overview

The PDP includes a tabbed interface displaying product information.

Tabs:

- Benefits
- Ingredients
- How to Use

Tabs render only when content exists.

## Data Sources

Variant metafields:

variant.metafields.custom.benefits  
variant.metafields.custom.ingredients  
variant.metafields.custom.how_to_use

Fallback to product metafields when variant values are empty.

## Snippet

snippets/benefits-ingredients-panel.liquid

Alpine controls the active tab:

x-data="{ tab: 'benefits' }"

## Accessibility

The tabs follow WAI‑ARIA standards.

Attributes used:

role="tablist"  
role="tab"  
aria-selected  
aria-controls

Keyboard navigation implemented in:

assets/benefits-tabs.js

Supported keys:

- Arrow Left
- Arrow Right
- Home
- End
- Enter
- Space

---

# Feature 3 — Sticky Add-to-Cart Bar

## Overview

A sticky Add‑to‑Cart bar appears after the main PDP buy box scrolls out of view.

Displayed information:

- product image
- product title
- selected variant
- price
- quantity selector
- add‑to‑cart button

## Snippet

snippets/custom-sticky-add-to-cart.liquid

The component uses Alpine.js to detect scroll position and toggle visibility.

Variant updates automatically update:

- price
- availability
- button state

---

# Assets

### routine-state.js

Responsible for:

- routine builder state
- product selection logic
- AJAX cart submission
- cart drawer refresh

### benefits-tabs.js

Handles:

- tab navigation
- keyboard accessibility
- panel visibility

### pdp-enhancements.css

Provides styling for:

- routine builder cards
- accordion layout
- selected product states

---

# Setup Instructions

1. Clone repository

git clone <repo-url>

2. Connect to Shopify store

shopify theme dev

3. Push theme

shopify theme push

4. Configure metafields and metaobjects in Shopify Admin.

---

# Assumptions

- Routine configuration is stored in metaobjects
- Each step references multiple products
- Each selected product adds quantity = 1
- First available variant is used when no variant is selected

---

# Edge Cases Handled

- Missing metafields
- Empty tab content
- Failed AJAX cart requests
- Unavailable variants
- Invalid routine selections

Errors are logged in the browser console for debugging.

---

# Known Limitations

- Bundle discount logic not implemented
- Inventory validation occurs during cart submission
- Styling is minimal and focused on functionality

---

# Future Improvements

Possible improvements:

- bundle discounts via Shopify Functions
- persist routine selections using localStorage
- improved selection UI feedback
- analytics tracking for bundle interactions

---

# Summary

This implementation demonstrates:

- metaobject-driven architecture
- accessible UI components
- modular Shopify sections and snippets
- Alpine.js state management
- Shopify-native AJAX cart APIs
- scalable theme architecture
