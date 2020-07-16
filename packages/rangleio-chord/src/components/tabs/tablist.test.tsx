import React from 'react';
import { render } from '@rangleio/test/utils';
import { TabList } from './tablist';
import * as TabContext from './tabcontext';

const tabContextValue = {
    idPrefix: 'uuid',
    value: '',
};
jest.spyOn(TabContext, 'useTabContext')
    .mockImplementation(() => tabContextValue)
;

describe('<TabList />', () => {

    describe('A11y General', () => {
        it('should be included in the accessibility-tree when visible', () => {
            const { getByRole } = render(<TabList />);
            const tablist = getByRole('tablist');
            expect(tablist).not.toBeInaccessible();
        });

        /**
         * Note: use `getByTestId` instead of `getByRole` since `role` is ignoered
         * on elements when using `aria-hidden`
         */
        it('should be excluded from the accessibility-tree when hidden', () => {
            const { getByTestId } = render(<TabList aria-hidden='true' data-testid='tablist' />);
            const tablist = getByTestId('tablist');
            expect(tablist).toBeInaccessible();
        });
    });

    describe('A11y roles/properties/attributes', ()=>{

        it('should render as [role=tablist]', () => {
            const { getByRole } = render(<TabList  />);
            const tablist = getByRole('tablist');
            expect(tablist).toHaveAttribute('role', 'tablist');
        });


        it('can use aria-label', () => {
            const { getByRole } = render(<TabList aria-label='Test TabList' />);
            const tab = getByRole('tablist');
            expect(tab).toHaveAccessibleName('Test TabList');
        });

        it('can use aria-labelledby', () => {
            const { getByRole } = render(
                <React.Fragment>
                    <TabList aria-labelledby='firstLabel secondLabel' />
                    <div id='firstLabel'>Test</div>
                    <div id='secondLabel'>TabList</div>
                </React.Fragment>
            );
            const tab = getByRole('tablist');
            expect(tab).toHaveAccessibleName('Test TabList');
        });

        it('can use aria-describedby', () => {
            const { getByRole } = render(
                <React.Fragment>
                    <TabList aria-describedby='firstLabel secondLabel' />
                    <div id='firstLabel'>Tablist</div>
                    <div id='secondLabel'>Description</div>
                </React.Fragment>
            );
            const tab = getByRole('tablist');
            expect(tab).toHaveAccessibleDescription('Tablist Description');
        })

    });
    
});