import React, { MouseEvent } from "react";
import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@rangleio/chord';

export type ButtonProps = BaseButtonProps & {
    as: string;
}

export const Button = ({children, ...otherProps}:ButtonProps) => {
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        alert('Button Clicked');
    }
    let props = {
        ...otherProps,
    };
    if( otherProps.as === 'a' ) {
        
    }
    return <BaseButton {...props}>{children}</BaseButton>
}