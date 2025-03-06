# KeyCoa.ch Source Code

<https://www.keycoa.ch>

## Description

Next.js project with TypeScript, Tailwind CSS, and ESLint. This project has all the frontend stuff and the backend API all lumped into one. The backend API is in the `/app/api` directory.

## Running Locally

### Install and Get Started

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Run Production Server

```bash
npm run build
npm start
```

### Test Before Deployment

```bash
npm run test:deploy
```

## Testing

I haven't written any tests, but we're all set up to write them with jest when we want to. If you write some code that you think needs a test, put it in the `/test` directory. Make sure it follows the `**.test.ts` pattern. You can run the tests with:

```bash
npm test
```

Any test that you write will be run by GitHub actions every time we push to the `main` branch, so make sure they pass before you push.

## Style Guide

I've never had a style guide before on a school project, but maybe we could try it out! Add whatever styles you're passionate about. I'm passionate about Styles Weiler. Here's some style guide stuff if you're into that:

- File names are all `kebab-case` (that's what next.js uses. Like `not-found.tsx` and `global-error.tsx`)
- 2 spaces for indentation (set in `.prettierrc`)
- 100 character line length limit (set in `.prettierrc`)

## Changes and Deployment

This project is deployed to AWS Amplify. The deployment is triggered by pushing to the `production` branch, so make a pull request and merge it to `production` when you're ready to deploy.

### Feature Changes

Create a feature branch off of `main` and make your changes. When you're ready to merge, make a pull request to `main`.

### Bug Fixes

Create a bug fix branch off of `staging` and make your changes. When you're ready to merge, make a pull request to `staging`.

### Hotfixes

Create a hotfix branch off of `production` and make your changes. When you're ready to merge, make a pull request to `production`.

### Deployment

Pull requests to `production` will trigger a deployment to AWS Amplify.
