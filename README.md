# GIT-REPO (Trending Git Repositories)
In this app we are using ReactJS, Context-API, Typescript and Nextjs for SSR.


## How to use

### Step 1: NodeJS and npm
Download and install __[Node.js v16.13.1](https://nodejs.org/dist/v16.13.1/)__.(preferabally latest stable version)

### Step 2: Get dependency packages

    npm install or yarn

### Step 3: Start project
To run the development server:

```bash
npm run dev
# or
yarn dev

```
To run the production server:

```bash
npm run start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can take a look at `pages/index.tsx` for initial page which fetches the list of repositories from Git api. The page auto-updates as you edit the file while running the server.

[API routes] that fetches the the details from server can we can be accessed through the following api urls:
- Searching for repositories: [http://localhost:3000/api/repositories](http://localhost:3000/api/repositories). This endpoint can be edited in `pages/api/repositories.ts`.
  
  query parameters:

  | Parameter            | accepted values  |
  | :-------:            | :--------------: |
  | q (string) Required* | [https://docs.github.com/en/search-github/searching-on-github/searching-for-repositories](All possible query value, in our case we are just using language and created) |
  | sort (string)        | stars (default), forks, help-wanted-issues, updated                                                                 |
  | order (string)       | desc (default), asc                                                                                                 |
  | per_page (integer)   | 30 (default), 100(max)                                                                                              |
  | page (integer)       | 1 (default)                                                                                                         |

  Example: [https://api.github.com/search/repositories?q=language:c&created:>2022-09-28&sort=stars&order=desc&page=0](https://api.github.com/search/repositories?q=language:c&created:>2022-09-28&sort=stars&order=desc&page=0)

### Context
We are storing the liked repositories in the browser's local storage which is updated into the react context on load of the application.
The likes are stored and updated in `context/DataContext.tsx`

### Testing
Run the following command: `npm run test`, this also provides the coverage of the test files.

However, for now i have written units tests only for few Components like:
- Home (index.spec.tsx)
- RepositoryList (RepositoryList.spec.tsx)
- Star (Star.spec.tsx)
- LanguageFilter (LanguageFilter.spec.tsx)

The mock data is available in the `mocks` folder which is used for testing.

* Typescript Types are mentioned under `interfaces` folder (Example: IRepositoryList, IRepository) 

