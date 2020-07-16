import React from 'react';
import { StyledComponentProps } from 'styled-components';
import { Flex } from '../flex';
import { BaseButton, BaseButtonProps } from '../button';

export type TabProps = StyledComponentProps<
    'button',
    any,
    BaseButtonProps & {
        icon?: React.ReactElement;
        label?: React.ReactNode;
        selected?: boolean;
        value?: any;
        selectionFollowsFocus?: boolean;
        onClick?: React.MouseEventHandler;
        onChange?: (event: any, value: any) => void;
        onFocus?: React.FocusEventHandler;
    },
    never
>;


export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(
    (props, ref)=> {
        const {
            icon, 
            label,
            selected,
            disabled,
            children, 
            onClick,
            onChange,
            onFocus,
            value,
            selectionFollowsFocus,
            ...other
        } = props;

        const handleClick = (event: React.MouseEvent) => {
            if( onChange ) {
                onChange(event, value);
            }

            if( onClick ) {
                onClick(event);
            }
        };

        const handleFocus = (event: React.FocusEvent) => {
            if (selectionFollowsFocus && !selected && onChange) {
                onChange(event, value);
            }
        
            if (onFocus) {
                onFocus(event);
            }
        };
    

        return (
            <BaseButton 
                ref={ref} 
                role='tab'
                style={`background-color: ${selected? '#666666' : null}`}
                aria-selected={selected}
                disabled={disabled}
                onClick={handleClick}
                onFocus={handleFocus}
                tabIndex={selected? 0 : -1}
                {...other}
            >
                <Flex 
                    as='span'
                    display='inline-flex' 
                    alignItems='center' 
                    justifyContent='center' 
                    width='100%' 
                    flexDirection='column'
                >
                    {icon}
                    {label}
                </Flex>
            </BaseButton>
        );
    }
);

Tab.defaultProps = {
    selected: false,
};