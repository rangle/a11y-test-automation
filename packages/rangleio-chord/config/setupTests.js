// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';

import { computeAccessibleName, computeAccessibleDescription } from 'dom-accessibility-api';
import { isInaccessible } from '@testing-library/dom';
import { pretendVisibleGetComputedStyle } from './utils';

expect.extend({
    toHaveAccessibleName(received, expectedName) {
        const matcherName = 'toHaveAccessibleName';
        const options = {
            isNot: this.isNot,
            promise: this.promise,
        }
        
        const actualName = computeAccessibleName(received, {
            // in local development we pretend to be visible. full getComputedStyle is
            // expensive and reserved for CI
            getComputedStyle: process.env.CI ? undefined : pretendVisibleGetComputedStyle,
        });
        const pass = actualName === expectedName;

        const message = () => this.utils.matcherHint(matcherName, undefined, undefined, options) +
            '\n\n' +
            `Expected: ${this.utils.printExpected(expectedName)}\n` +
            `Received: ${this.utils.printReceived(actualName)}`;
        
        return { actual: received, message, pass};
    },

    toHaveAccessibleDescription(received, expectedName) {
        const matcherName = 'toHaveAccessibleDescription';
        const options = {
            isNot: this.isNot,
            promise: this.promise,
        }

        const actualName = computeAccessibleDescription(received, {
            getComputedStyle: process.env.CI ? undefined : pretendVisibleGetComputedStyle,
        });
        const pass = actualName === expectedName;

        const message = () => this.utils.matcherHint(matcherName, undefined, undefined, options) +
            '\n\n' +
            `Expected: ${this.utils.printExpected(expectedName)}\n` +
            `Received: ${this.utils.printReceived(actualName)}`;
        
        return { actual: received, message, pass};
    },

    toBeInaccessible(received, expected) {
        const matcherName = "toBeInaccessible";
        const options = {
            isNot: this.isNot,
            promise: this.promise,
        }
        this.utils.ensureNoExpected(expected, matcherName, options);

        const pass = Object.is(isInaccessible(received), true);

        const message = () => this.utils.matcherHint(matcherName, undefined, '', options) + 
            '\n\n' +
            `Received: ${this.utils.printReceived(received)}`;
        
        return {message, pass};
    }
});