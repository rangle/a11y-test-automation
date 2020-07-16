import _ from 'lodash';
import React from 'react';
import { axe } from 'jest-axe';
import { render as defaultRender, fireEvent } from './react';
import Keyboard from './keyEventMap';

function testRoles(element, getOptions) {
    describe('Roles', ()=> {
        const { role } = getOptions();
        it(`should have the correct role ${role}`, async ()=> {
            const { render = defaultRender } = getOptions();
            const { getByRole } = render(React.cloneElement(element, {}));
            const ele = getByRole(role);
            expect(ele).toBeTruthy();
        });
    });
}

function testStates(element, getOptions) {
    describe('States (Aria)', ()=> {
        it.todo('Not yet implemented');
    });
}

function testProps(element, getOptions) {
    describe('Properties (Aria)', ()=> {
        it.todo('Not yet implemented');
    });
}

function testKeyboard(element, getOptions) {
    describe('Keyboard Interactions', ()=> {
        const { keyboardOptions = {}, render = defaultRender } = getOptions();
        const { selector } = keyboardOptions;
        it('should be able to be tabbed into', async () => {
            const { baseElement, container, getByTestId, debug } = render(React.cloneElement(element, {}));
            const button = getByTestId('button');
            //debug();

            button.focus();
            //selector(button)
            expect(document.activeElement).toBe(button);
            //fireEvent.click(baseElement);
            fireEvent.keyDown(button, {key: 'Tab', code: 'Tab'});
            
            //console.log('ele:', baseElement, container);

            expect(document.activeElement).not.toBe(button);
        });
        /* it('should be able to be tabbed out of', async () => {
            const { container } = render(React.cloneElement(element, {}));
            container.firstChild.focus();
            fireEvent.keyDown(container.firstChild, {key: 'Tab'});
            expect(document.activeElement).toBe(container);
        }); */
       /*  Object.keys(keyboardOptions)
            .forEach((keyCode)=> {
                const { keyEventType = 'keyDown', expectResults, action = null, name = `${keyCode} key` } = keyboardOptions[keyCode];
                it((name), async ()=> {
                    const keyProp = _.camelCase(`on-${keyEventType}`);
                    const eventAction = action || jest.fn().mockName(`${keyProp}(${keyCode})`);
                    const { getByRole } = render(React.cloneElement(element, { [keyProp]: eventAction }));
                    const ele = getByRole(role);
                    ele.focus();
                    fireEvent[keyEventType](ele, Keyboard.getMockEvent(keyCode));
                    expectResults(ele, eventAction);
                });
            }); */
    });
}

function testAnnotations(element, getOptions) {
    describe('Annotations', () => {
        const { render = defaultRender, annotationOptions } = getOptions();
        it.todo('should annotate the element correctly');
    })
}

function testViolations(element, getOptions) {
    describe('Violations', ()=> {
        it('should have no violations (#AxeClean!)', async () => {
            const { render = defaultRender } = getOptions();
            const { container } = render(React.cloneElement(element,{}));
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
}



const fullSuite = {
    roles: testRoles,
    props: testProps, // Note: Should this be kept?
    states: testStates, // Note: Should this be kept?
    keyboard: testKeyboard,
    violations: testViolations
};

export default function describeA11yConformance(minimalElement, getOptions) {
    const { 
        afterAll: runAfterAllHook = () => {}, 
        afterEach: runAfterEachHook = ()=> {},
        only = Object.keys(fullSuite), 
        skip = [] 
    } = getOptions();

    describe('A11y Conformance', () => {
        afterEach(runAfterEachHook);
        afterAll(runAfterAllHook);

        Object.keys(fullSuite)
            .filter((testKey) => only.indexOf(testKey) !== -1 && skip.indexOf(testKey) === -1)
            .forEach((testKey) => {
                const test = fullSuite[testKey];
                test(minimalElement, getOptions);
            });
    });
}