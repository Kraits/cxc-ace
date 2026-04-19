# Contributing to CXC Ace

Thank you for your interest in contributing to CXC Ace! This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Git
- A code editor (VS Code recommended)

### Setup

1. **Fork the repository** and clone it locally:
   ```bash
   git clone https://github.com/your-username/cxc-ace.git
   cd cxc-ace
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment:**
   ```bash
   cp .env.example .env
   npm run setup
   ```

4. **Start the dev server:**
   ```bash
   npm run dev
   ```

## Development Guidelines

### Code Style

- Use **TypeScript** for all new files
- Follow existing naming conventions (camelCase for variables, PascalCase for components)
- Use **Tailwind CSS** utility classes for styling
- Keep components focused — break large components into smaller ones
- Use the existing Zustand store for state management

### Adding Questions

Questions are seeded via `prisma/seed.ts`. To add new questions:

1. Add the question using the `mcq()` helper function in the `QUESTIONS` object
2. Use the subject code as the key (e.g., `'CSEC-MATH'`)
3. Include the topic name, difficulty level, and a detailed explanation
4. Run `npm run db:seed` to apply

### Adding New Subjects

1. Add the subject definition to the `SUBJECTS` array in `prisma/seed.ts`
2. Add a topic array with relevant topics for that subject
3. Add questions to the `QUESTIONS` object using the subject code
4. Optionally add an icon in `src/app/lib/store.tsx` (`SUBJECT_ICONS`)

### API Routes

API routes follow RESTful conventions under `src/app/api/`. Each route:
- Uses `try/catch` error handling
- Returns proper HTTP status codes
- Validates input before processing
- Logs errors with a descriptive prefix tag

### UI Components

The project uses [shadcn/ui](https://ui.shadcn.com/) for UI primitives. To add a new shadcn component:
```bash
npx shadcn@latest add <component-name>
```

Custom components live in `src/app/components/` and follow these conventions:
- Named exports for components
- TypeScript interfaces for props
- Tailwind CSS for all styling
- Framer Motion for animations

## Pull Request Process

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/descriptive-name
   ```

2. **Make your changes** and commit with clear messages:
   ```bash
   git commit -m "Add feature: description of change"
   ```

3. **Push** to your fork and open a Pull Request

4. **Describe your changes** in the PR, including:
   - What was changed and why
   - Any new dependencies added
   - Screenshots for UI changes (if applicable)

### PR Guidelines

- Keep PRs focused on a single concern
- Do not include database schema changes without discussion
- Ensure the build passes (`npm run build`)
- Test your changes manually before submitting
- Be respectful and constructive in code review

## Reporting Issues

When reporting bugs, please include:

- **OS and browser/version** where the issue occurs
- **Steps to reproduce** the issue
- **Expected vs. actual** behavior
- **Screenshots** if applicable
- **Console errors** if any

## Feature Requests

Feature requests are welcome! Please describe:

- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

## Adding New Subjects or Content

We especially welcome contributions that add:

- New CSEC or CAPE subjects
- Additional practice questions for existing subjects
- SBA templates for different subjects
- Study tips and resources

Content should be accurate and aligned with the official CXC/CAPE syllabus.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
