## Getting Started

0. use nvm to switch the node version(v20):
   ```bash
   nvm use
   ```
1. install the dependencies:
    ```bash
    npm install
    ```

2. run the server:
    ```bash
    npm run dev
    ```

3. run test and coverage
    ```bash
    npm run test:coverage
    ```
coverage report can be found under `coverage/lcov-report/index.html`

## Tech Stack
 * Next.js 15, App router, Server Components
 * Typescript, Tailwind, Jest, Testing Library

## Design Patterns
### Decorator pattern
To separate data transformation from component rendering.

Alternatively, we can:
* transform the data from API server
* transform the data in the ingestion layer

### Strategy pattern
To separate the data fetching from the service so that we can extend more
strategies (e.g. DBLoader, MemoryLoader, APILoader) easily without changing
the existing service code. 

And make it easy to test the service with a mock loader.

## Trade-offs
Due to time constraints, I made the following trade-offs:
* I used a simple design with tailwind instead a design system
* I only covered few lib files and 1 component in the test

## What's next
before going to production, I would:
* add pagination / lazy loading to avoid loading all the data at once
* structure the code in a more modular way (atomic design) with sub-folders
* extract more components out of the HotelCard
* check accessibility against WCAG 2.1
* check core web vitals (lighthouse)
* replace console.log with a logger
* add more tests
* add pre-commit hooks to run tests before commit
* tune the types against the API
* add cypress e2e tests
* align tailwind breakpoints with design
* reduce the size of the bundle
* reduce dom
* 
