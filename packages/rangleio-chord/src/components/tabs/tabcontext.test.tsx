import React from 'react';
import { render } from '@rangleio/test/utils';
import { TabContext, useTabContext, getPanelId, getTabId } from './tabcontext';


const TabsFixture = ({ value }:{value:any})=> {
    const context = useTabContext();
    if( context === null || context === undefined ) throw new TypeError('context not found');
    return (
        <React.Fragment>
            <div data-testid='active-value' data-value={context.value} />
            <div role='tab' id={getTabId(context, value)} />
            <div role='tabpanel' id={getPanelId(context, value)} />
        </React.Fragment>
    );
}

describe('<TabContext />', () => {

    it('should be null by default', () => {
        let value;
        function Tabs() {
            value = useTabContext();
            return null;
        }

        render(<Tabs />);
        expect(value).toBeNull();
    });

    it('should provide an id prefix for IDREFs and the active value', ()=> {
        
        const { getByRole, getByTestId } = render(
            <TabContext value='0'>
                <TabsFixture value='0' />
            </TabContext>
        );

        const tabId = getByRole('tab').id;
        const panelId = getByRole('tabpanel').id;
        const activeValue = getByTestId('active-value');
        expect(tabId.length).toBeGreaterThanOrEqual(1);
        expect(panelId.length).toBeGreaterThanOrEqual(1);
        expect(tabId).not.toEqual(panelId);
        expect(activeValue).toHaveAttribute('data-value', '0');
    })

})