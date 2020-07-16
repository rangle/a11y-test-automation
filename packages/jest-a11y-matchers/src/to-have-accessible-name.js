import { computeAccessibleName } from 'dom-accessibility-api';
import { pretendVisibleGetComputedStyle } from './utils';

export const toHaveAccessibleName = (received, expectedName) => {
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
}