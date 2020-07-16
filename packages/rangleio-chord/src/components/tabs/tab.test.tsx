import React from 'react';
import { render } from '@rangleio/test/utils';
import { Tab } from './tab';

describe('<Tab />', () => {

    describe('A11y General', () => {

        it('should be included in the accessibility-tree when visible', () => {
            const { getByTestId } = render(<Tab label='Tab Label' data-testid='tab' />);
            expect(getByTestId('tab')).not.toBeInaccessible();
        });

        it('should be excluded from the accessibility-tree when hidden', () => {
            const { getByTestId } = render(<Tab label='Tab Label' aria-hidden='true' data-testid='tab' />);
            expect(getByTestId('tab')).toBeInaccessible();
        });

    })

    describe('A11y roles/properties/attributes', () => {

        it('should render as [role=tab]', () => {
            const { getByTestId } = render(<Tab label='Tab Label' data-testid='tab' />);
            const tab = getByTestId('tab');
            expect(tab).toHaveAttribute('role','tab');
        });

        it('can use aria-label', () => {
            const { getByTestId } = render(<Tab aria-label='Tab Label' data-testid='tab' />);
            const tab = getByTestId('tab');
            expect(tab).toHaveAccessibleName('Tab Label');
        });

        it('can use aria-labelledby', () => {
            const { getByTestId } = render(
                <div>
                    <span id='firstArialLabelID'>Hello</span>
                    <span id='secondAriaLabelID'>World</span>
                    <Tab aria-labelledby='firstArialLabelID secondAriaLabelID' data-testid='tab' />
                </div>
            );
            const tab = getByTestId('tab');
            expect(tab).toHaveAccessibleName('Hello World');
        });

        it('can use aria-describedby', () => {
            const { getByTestId } = render(
                <React.Fragment>
                    <span id='firstAriaDescID'>Hello</span>
                    <span id='secondAriaDescID'>World</span>
                    <Tab label='Tab Label' aria-describedby='firstAriaDescID secondAriaDescID' data-testid='tab' />
                </React.Fragment>
            );
            const tab = getByTestId('tab');
            expect(tab).toHaveAccessibleDescription('Hello World');
        });

    });
});