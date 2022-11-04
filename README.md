## What this is all about?

This example shows the amount of rerenders when we're calling any hook from `react-instantsearch-hooks-web` It can be viewed here [https://codesandbox.io/s/github/daxupaxu/rerenders-example](https://codesandbox.io/s/github/daxupaxu/rerenders-example)

## Based on

codesandbox sent by dhyab [sandbox](https://github.com/algolia/react-instantsearch/issues/3506#issuecomment-1240430432)

## Questions

- Why each hook rerenders 3 times? (2 comes instantly so the logic I assume is:
  - regular render (obv)
  - hydration ?
  - perhaps the third one is because of `use` method ?)
- Why when we're calling dynamic widgets here, hierarchical menu seem to be appearing where as on the other one it doesn't?
- Why breadcrumbs sometimes appear and sometimes not? It's flaky, sometimes breadcrumbs for appliances are appearing sometimes not. No matter if we call refine method nor just a regular nextjs link(update on initial state)

- How do we debug algolia hooks in general in order to better understand the problems we're facing, is there anything that could help us looking into where what causes rerenders apart from the source code on the github?
