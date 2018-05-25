import * as React from 'react'

export interface InitialPropsContext {
  pathname: string
  query: string
  asPath: string
  req?: any
  res?: any
  jsonPageRes?: {}
  err?: Error
  props: { [key: string]: any }
}

/**
 * Runs a sequence of functions in the context of a `getInitialProps` call
 * for a Nextjs page. Each function will receive all the properties a typical
 * context from Nextjs has.
 *
 * Supports asynchronous functions that return a Promise that resolves to an
 * object with props for the component.
 *
 * @example
 * const MyComponent = withGetInitialProps(
 *  ({ req }) => ({ user: req.user }),
 *  ({ req }) => ({ referer: req.headers['referer'] })
 * )(props => {
 *  return (<p>User email is: {props.email}. Referer is {props.referer}</p>)
 * })
 * @param fns The functions to run the initial props context on to produce props
 */
export function withGetInitialProps (...fns: Array<(ctx: InitialPropsContext) => {}>) {
  return (WrappedComponent: React.ComponentType): React.ComponentType => {
    let Wrapper = props => (<WrappedComponent {...props } />)
    Wrapper['getInitialProps'] = (ctx) => {
      return fns.reduce((p, fn) => {
        return p.then(props => {
          return Promise.resolve(fn(ctx)).then(p => {
            return Object.assign(props, p)
          })
        })
      }, Promise.resolve({}))
    }
    return Wrapper
  }
}
