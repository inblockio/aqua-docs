# Aqua Documentation

The official documentation for **Aqua Protocol** - an open, public, and decentralized solution for data accountability and governance.

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd aqua-docs
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## Project Structure

- `docs/`: Contains the MDX documentation files organized by version (e.g., `v4.0.0/`).Your documentation goes here.
- `app/`: Next.js app router components and pages.
- `components/`: Reusable React components.
- `public/`: Static assets like images and logos.
- `out/`: Static web pages generated when you run `npm run build`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
