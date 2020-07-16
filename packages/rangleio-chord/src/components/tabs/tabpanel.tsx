import React from 'react';
import styled, { StyledComponentProps } from 'styled-components';
import { useTabContext, getTabId, getPanelId } from './tabcontext';
import { Box, BoxProps } from '../box';

export type TabPanelProps = StyledComponentProps<
    typeof Box, 
    any, 
    BoxProps & {
        value?: any;
    }, 
    never
>;

export const StyledTabPanel = styled(Box)<TabPanelProps>({
});

export const TabPanel = React.forwardRef<typeof Box,TabPanelProps>((props, ref) => {

    const {
        children,
        value,
        ...other
    } = props;

    const context = useTabContext();
    if( context === null ) throw new TypeError('No TabContext provided');

    const id = getPanelId(context, value);
    const tabId = getTabId(context, value);

    return (
        <StyledTabPanel
            aria-labelledby={tabId}
            hidden={value !== context.value}
            id={id}
            role='tabpanel'
            ref={ref}
            {...other}
        >
            {value === context.value && children}
        </StyledTabPanel>
    )
})