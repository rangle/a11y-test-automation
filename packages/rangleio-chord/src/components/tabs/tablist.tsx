import React from 'react';
import styled, { StyledComponentProps } from 'styled-components';
import { useTabContext, getTabId, getPanelId } from './tabcontext';
import { Flex, FlexProps } from '../flex';


export type TabListProps = StyledComponentProps<
    typeof Flex, 
    any, 
    FlexProps & {
        selectionFollowsFocus?: boolean;
    }, 
    never
>;

export const StyledTabList = styled(Flex)<TabListProps>({
});

export const TabList = React.forwardRef<typeof Flex,TabListProps>((props, ref) => {
    const {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledBy,
        'aria-describedby': ariaDescribedBy,
        children: childrenProp,
        onChange,
        selectionFollowsFocus = false,
        ...other
    } = props;

    const context = useTabContext();
    if( context === null ) throw new TypeError('No TabContext provided');


    const valueToIndex = new Map();
    const tabListRef: any = React.useRef(null);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const target = event.target as HTMLElement;
        const role = target.getAttribute('role');
        if( role !== 'tab' || tabListRef === null ) return;

        let newFocusTarget = null;

        switch(event.key) {
            case 'ArrowLeft':
                newFocusTarget = target.previousElementSibling || tabListRef.current.lastChild;
                break;
            case 'ArrowRight':
                newFocusTarget = target.nextElementSibling || tabListRef.current.firstChild;
                break;
            case 'Home':
                newFocusTarget = tabListRef.current.firstChild;
                break;
            case 'End':
                newFocusTarget = tabListRef.current.lastChild;
                break;
            default:
                break;
        }

        if (newFocusTarget !== null) {
            newFocusTarget.focus();
            event.preventDefault();
          }
    }

    let childIndex = 0;
    const children = React.Children.map(childrenProp, (child)=>{
        if (!React.isValidElement(child)) {
            return null;
        }
        
        const childValue = child.props.value === undefined ? childIndex : child.props.value;
        valueToIndex.set(childValue, childIndex);
        const selected = childValue === context.value;

        childIndex += 1;
        return React.cloneElement(child, {
            'aria-controls': getPanelId(context, childValue),
            id: getTabId(context, childValue),
            value: childValue,
            selectionFollowsFocus,
            selected,
            onChange,
        })
    })

    return (
        <StyledTabList ref={ref} {...other}>
            <div
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
                aria-describedby={ariaDescribedBy}
                onKeyDown={handleKeyDown}
                ref={tabListRef}
                role='tablist'
            >
                {children}
            </div>
        </StyledTabList>
    )    

})