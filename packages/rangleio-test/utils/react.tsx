import React from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components';
import { theme } from '@rangleio/chord';

const AllTheProviders = (props: any) => {
  return (
    <ThemeProvider theme={theme.light}>
        {props.children}
    </ThemeProvider>
  )
}


const customRender = (ui: React.ReactElement, options?: RenderOptions): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }