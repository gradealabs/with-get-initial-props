"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
/**
 * Runs a sequence of functions in the context of a `getInitialProps` context
 * for a Nextjs page. Each function will receive all the properties a typical
 * context from Nextjs has and a new property called `props` that will be equal
 * to the properties from the previous function in the chain.
 *
 * Supports asynchronous functions that return a Promise that resolves to an
 * object with props for the component.
 *
 * @example
 * const MyComponent = withGetInitialProps(
 *  ({ req }) => ({ user: req.user }),
 *  ({ props }) => ({ email: props.user.email })
 * )(props => {
 *  return (<p>User email is: {props.email}.</p>)
 * })
 * @param fns The functions to run the initial props context on to produce props
 */
function withGetInitialProps() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return function (WrappedComponent) {
        var Wrapper = function (props) { return (React.createElement(WrappedComponent, __assign({}, props))); };
        Wrapper['getInitialProps'] = function (ctx) {
            return fns.reduce(function (p, fn) {
                return p.then(function (props) {
                    return fn(Object.assign({}, ctx, { props: props }));
                });
            }, Promise.resolve({}));
        };
        return Wrapper;
    };
}
exports.withGetInitialProps = withGetInitialProps;
