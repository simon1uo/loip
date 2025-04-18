# Contributing to Loip

Thank you for your interest in contributing to Loip! This document provides guidelines and instructions for contributing.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/loip.git`
3. Install dependencies: `pnpm install`
4. Start the development server: `pnpm dev`

## Building

- Build the library: `pnpm build`
- Build the demo: `pnpm build:demo`

## Code Style

This project uses ESLint for code linting. Run `pnpm lint` to check and fix code style issues.

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages. This leads to more readable messages that are easy to follow when looking through the project history and helps generate the changelog.

Each commit message should be structured as follows:

```text
<type>(<scope>): <subject>
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries

### Examples

```text
feat(i18n): add Chinese language support
fix(avatar): correct avatar sizing on mobile devices
docs: update installation instructions
chore: update dependencies
```

## Pull Request Process

1. Create a new branch for your feature or bugfix
2. Make your changes
3. Run tests and ensure code quality: `pnpm lint`
4. Submit a pull request to the main repository

## Release Process

### Automated Release (Recommended)

This project uses GitHub Actions for automated publishing to NPM:

1. Go to the GitHub repository
2. Navigate to the "Actions" tab
3. Select the "Create Release" workflow
4. Click "Run workflow"
5. Choose the version type (patch, minor, or major)
6. Click "Run workflow"

This will:
- Bump the version in package.json
- Create a new git tag
- Generate a changelog from commit history
- Create a GitHub release with the changelog
- Trigger the npm-publish workflow to publish the package to NPM

### Manual Release

You can also manually publish using:

```bash
# Publish a patch version (1.0.0 -> 1.0.1)
pnpm run release:patch

# Publish a minor version (1.0.0 -> 1.1.0)
pnpm run release:minor

# Publish a major version (1.0.0 -> 2.0.0)
pnpm run release:major
```

## Setting up NPM Token

To enable GitHub Actions to publish to NPM, you need to add your NPM token as a secret:

1. Generate an NPM access token with publish permissions
2. Go to your GitHub repository settings
3. Navigate to "Secrets and variables" > "Actions"
4. Add a new repository secret with the name `NPM_TOKEN` and the value of your NPM token
