# Musician Portfolio Website

A modern, NYC-based musician portfolio built with React, TypeScript, and Vite.

## Project Structure

- `src/pages/`: Contains the four main pages of the site.
  - `Works.tsx`: Multimedia showcase (Video, Audio, Visuals).
  - `Shows.tsx`: Tour dates and booking information.
  - `Shop.tsx`: Merch and digital goods marketplace.
  - `Contact.tsx`: Email and location details.
- `src/styles/`: Global and page-specific CSS.
  - `App.css`: Global variables, layout, and navigation.
  - `Pages.css`: Styles for internal components and grids.
- `src/App.tsx`: Main routing and navigation setup.

## Customization

### Adding Works
To add your own music or videos, update the `videos`, `audio`, or `visuals` arrays in `src/pages/Works.tsx`.

### Managing Shows
Update the `shows` array in `src/pages/Shows.tsx`. To show "Coming soon", simply clear the array: `const shows = [];`.

### Shop Items
Add new products to the `products` array in `src/pages/Shop.tsx`.

### Contact Info
Update the `email` constant in `src/pages/Contact.tsx`.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
