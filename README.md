# With Get Initial Props

A React HOC for Nextjs that wraps a series of functions that provide initial
props.

## Install

```
npm install react gradealabs/with-get-initial-props#0.0.2 --save
```

## Quick Start

```js
import * as React from 'react'
import { withGetInitialProps } from '@gradealabs/with-get-initial-props'

const MyComponent = withGetInitialProps(
  ({ req }) => ({ user: req.user }),
  ({ props }) => ({ email: props.user.email })
)(props => {
  return (<p>User email is: {props.email}. Full user is: {JSON.stringify(props.user, null, 2)}</p>)
})
```

## API

```ts
export interface InitialPropsContext {
    pathname: string;
    query: string;
    asPath: string;
    req?: any;
    res?: any;
    jsonPageRes?: {};
    err?: Error;
    props: {
        [key: string]: any;
    };
}
/**
 * Runs a sequence of functions in the context of a `getInitialProps` context
 * for a Nextjs page. Each function will receive all the properties a typical
 * context from Nextjs has and a new property called `props` that will be equal
 * to the properties set from all the previous functions that have ran.
 *
 * Supports asynchronous functions that return a Promise that resolves to an
 * object with props for the component.
 *
 * @example
 * const MyComponent = withGetInitialProps(
 *  ({ req }) => ({ user: req.user }),
 *  ({ props }) => ({ email: props.user.email })
 * )(props => {
 *  return (<p>User email is: {props.email}. Full user is: {JSON.stringify(props.user, null, 2)}</p>)
 * })
 * @param fns The functions to run the initial props context on to produce props
 */
export declare function withGetInitialProps(...fns: Array<(ctx: InitialPropsContext) => {}>): (WrappedComponent: React.ComponentType<{}>) => React.ComponentType<{}>;
```
