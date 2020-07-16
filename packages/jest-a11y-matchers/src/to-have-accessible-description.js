import { computeAccessibleDescription } from 'dom-accessibility-api';
import { pretendVisibleGetComputedStyle } from './utils';

export const toHaveAccessibleDescription = (received, expectedName) => {
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