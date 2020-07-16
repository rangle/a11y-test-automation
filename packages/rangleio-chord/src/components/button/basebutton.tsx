import React, { forwardRef } from 'react';
import styled, { StyledComponentProps } from 'styled-components';
import {
  border,
  compose,
  flexbox,
  layout,
  position,
  space,
  variant,
  BorderProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  ColorProps,
} from 'styled-system';
import { focusRing } from '../shared-styles';

export type StyledBaseButtonProps = SpaceProps &
  ColorProps & 
  LayoutProps &
  FlexboxProps &
  BorderProps &
  PositionProps & {
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'transparent';
  };

const defaultBaseButtonStyles = {
  position: 'relative',
  fontFamily: 'body',
  fontSize: 2,
  fontWeight: 'regular',
  lineHeight: 'copy',
  borderRadius: 0,
  borderWidth: 2,
  borderStyle: 'solid',
  padding: 3,
  ml: 0,
  mr: 0,
  mb: 0,
  appearance: 'none',
};

const buttonVariants = variant({
  variants: {
    primary: {
      ...defaultBaseButtonStyles,
      bg: 'brand.primary',
      color: 'text.inverse',
      borderColor: 'transparent',
      ' svg': {
        color: 'text.inverse',
      },
      '&:hover': {
        backgroundColor: 'highlights.primaryHighlight',
      },
      '&:active, &:focus': {
        backgroundColor: 'highlights.primaryExtraHighlight',
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'ui.disabled',
        borderColor: 'ui.disabled',
      },
    },
    secondary: {
      ...defaultBaseButtonStyles,
      bg: 'bg.primary',
      color: 'brand.primary',
      borderColor: 'brand.primary',
      ' svg': {
        color: 'brand.primary',
      },
      '&:hover': {
        borderColor: 'highlights.primaryHighlight',
      },
      '&:active, &:focus': {
        borderColor: 'highlights.primaryExtraHighlight',
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'bg.primary',
        borderColor: 'ui.disabled',
      },
    },
    transparent: {
      ...defaultBaseButtonStyles,
      bg: 'transparent',
      color: 'brand.primary',
      borderColor: 'transparent',
      ' svg': {
        color: 'brand.primary',
      },
      '&:hover': {
        backgroundColor: 'highlights.bgHighlight',
      },
      '&:active, &:focus': {
        backgroundColor: 'highlights.bgHighlight',
      },
      '&:disabled': {
        color: 'text.disabled',
        backgroundColor: 'ui.disabled',
        borderColor: 'ui.disabled',
      },
    },
  },
});

const StyledBaseButton = styled.button<BaseButtonProps>`
  ${buttonVariants}
  ${compose(space, layout, flexbox, border, position)}

  &:focus {
    ${focusRing}
  }
`;

export type BaseButtonProps = StyledComponentProps<
  'button',
  any,
  StyledBaseButtonProps,
  never
>;

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    {
      disabled,
      children,
      mb,
      mt,
      mx,
      my,
      ml,
      mr,
      ...props
    },
    ref
  ) => (
    <StyledBaseButton
      ref={ref}
      py={2}
      disabled={disabled}
      mx={mx}
      my={my}
      mb={mb}
      mt={mt}
      ml={ml}
      mr={mr}
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      
        {children}

    </StyledBaseButton>
  )
);

BaseButton.defaultProps = {
  variant: 'primary',
};
