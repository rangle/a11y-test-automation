import React from 'react';
import { render } from '@rangleio/test/utils';
import * as TabContext from './tabcontext';
import { TabPanel } from './tabpanel';


const tabContextValue = {
    idPrefix: 'uuid',
    value: '1',
};

jest.spyOn(TabContext, 'useTabContext')
    .mockImplementation(() => tabContextValue)
;

describe('<TabPanel />', ()=> {


   describe('A11y roles/properties/attributes', () => {

        it('should render as [role=tabpanel]', () => {

            const { getByTestId } = render(<TabPanel value="0" data-testid='tabpanel' />);

            expect(getByTestId('tabpanel')).toHaveAttribute('role','tabpanel');
        });

        /**
         * Note: arial-labelledby is hooked up from the TabContext,
         * therefore it is tested in the integrations
         */

        it('can use aria-describedby', () => {
            const { getByTestId } = render(
                <TabPanel value="1" aria-describedby='firstLabel secondLabel' data-testid='tabpanel'>
                    <div id='firstLabel'>Test</div>
                    <div id='secondLabel'>TabPanel</div>
                </TabPanel>
            );
            
            const tab = getByTestId('tabpanel');
            expect(tab).toHaveAccessibleDescription('Test TabPanel');
        })
    });

    
 
    it('should be [hidden] when TabPanel#value !== TabContext#value and does not mount children', () => {

        const { getByTestId, queryByTestId } = render(
                <TabPanel value="0" data-testid="tabpanel">
                    <div data-testid='child' />
                </TabPanel>
        );

        expect(getByTestId('tabpanel')).toHaveProperty('hidden', true);
        expect(queryByTestId('child')).toBeNull();
    });

    
});