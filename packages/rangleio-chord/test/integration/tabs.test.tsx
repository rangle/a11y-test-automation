import React from 'react';
import { render, fireEvent } from '@rangleio/test/utils';
import { TabContext, Tab, TabList, TabPanel } from '@rangleio/chord';

const makeFixture = (value: string = 'A') => {
    
    return (
        <TabContext value={value}>
            <TabList data-testid='tablist' arial-label='simple tab list'>
                <Tab value='A' label='label A' data-testid='tabA' />
                <Tab value='B' aria-label='label B' data-testid='tabB' />
                <Tab value='C' label='label C' data-testid='tabC' />
            </TabList>
            <TabPanel value='A' data-testid='panelA' />
            <TabPanel value='B' data-testid='panelB' />
            <TabPanel value='C' data-testid='panelC' aria-describedby='firstAriaDescID secondAriaDescID'>
                <div id="firstAriaDescID">description</div>
                <div id="secondAriaDescID">C</div>
            </TabPanel>
        </TabContext>
    );
};

describe('<TabContext /> integration', () => {

    describe('A11y roles/properties/attributes', () =>{

        it('should have wired up aria-attributes', () => {
            const { getAllByRole, rerender } = render(makeFixture('A'));

            const [tabA, tabB, tabC] = getAllByRole('tab');

            expect(tabA).toHaveAttribute('aria-selected', 'true');
            expect(tabB).toHaveAttribute('aria-selected', 'false');
            expect(tabC).toHaveAttribute('aria-selected', 'false');

            let activePanel = document.getElementById(tabA.getAttribute('aria-controls')||'');
            expect(activePanel).not.toBeInaccessible();
            expect(activePanel).toHaveAccessibleName('label A');

            rerender(makeFixture('B'));

            expect(tabA).toHaveAttribute('aria-selected', 'false');
            expect(tabB).toHaveAttribute('aria-selected', 'true');
            expect(tabC).toHaveAttribute('aria-selected', 'false');

            activePanel = document.getElementById(tabB.getAttribute('aria-controls')||'');
            expect(activePanel).not.toBeInaccessible();
            expect(activePanel).toHaveAccessibleName('label B');
        });

        it('should have wired up tabIndexes', async ()=> {

            const { getAllByRole, rerender } = render(makeFixture('A'));

            const [tabA, tabB, tabC] = await getAllByRole('tab');

            expect(tabA).toHaveAttribute('tabindex', '0');
            expect(tabB).toHaveAttribute('tabindex', '-1');
            expect(tabC).toHaveAttribute('tabindex', '-1');

            rerender(makeFixture('B'));
            
            expect(tabA).toHaveAttribute('tabindex', '-1');
            expect(tabB).toHaveAttribute('tabindex', '0');
            expect(tabC).toHaveAttribute('tabindex', '-1');
            

        });


        it('<TabPanel /> will be lablelled by the correct <Tab label />', () => {
            const { getAllByRole, rerender } = render(makeFixture('A'));
            
            const [panelA, panelB] = getAllByRole('tabpanel', {hidden: true});
            expect(panelA).toHaveAccessibleName('label A');

            rerender(makeFixture('B'));
            expect(panelB).toHaveAccessibleName('label B');
            
        });

        it('Each <Tab /> has [aria-controls] referring to the associated <TabPanel />', async ()=> {
            const { getAllByRole } = render(makeFixture('A'));

            const tabs = getAllByRole('tab');
            const panels = getAllByRole('tabpanel', {hidden: true});

            expect(tabs.every((tab, i) => {
                const controlId = tab.getAttribute('aria-controls');
                const panelId = panels[i].getAttribute('id');
                return controlId === panelId;
            })).toBe(true);
        });

        
    });

    describe('A11y keyboard interactions', () => {
        it('ArrowRight: Move focus to next tab, if focus is on last tab, move focus to first tab', () => {
            const { getAllByRole } = render(makeFixture('B'));

            const [tabA, tabB, tabC] = getAllByRole('tab');

            tabB.focus();

            fireEvent.keyDown(tabB, {key: 'ArrowRight', code: 'ArrowRight'});
            expect(document.activeElement).toBe(tabC);

            fireEvent.keyDown(tabC, {key: 'ArrowRight', code: 'ArrowRight'});
            expect(document.activeElement).toBe(tabA);
        });

        it('ArrowLeft: Move focus to previous tab, if focus is on first tab, move focus to last tab', () => {
            const { getAllByRole } = render(makeFixture('B'));

            const [tabA, tabB, tabC] = getAllByRole('tab');

            tabB.focus();

            fireEvent.keyDown(tabB, {key: 'ArrowLeft', code: 'ArrowLeft'});
            expect(document.activeElement).toBe(tabA);

            fireEvent.keyDown(tabA, {key: 'ArrowLeft', code: 'ArrowLeft'});
            expect(document.activeElement).toBe(tabC);
        });
    });
    
});
