import React from 'react';

export type TabContextValue = {
  idPrefix: string | null;
  value: string;
}

function useUniquePrefix() {
  const [id, setId] = React.useState<TabContextValue['idPrefix']>(null);
  React.useEffect(() => {
    setId(`uid-${Math.round(Math.random() * 1e5)}`);
  }, []);
  return id;
}

const Context = React.createContext<TabContextValue | null>(null);
if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'TabContext';
}

export type TabContextProps = {
  children?: React.ReactNode;
  value: string;
};

export function TabContext(props: TabContextProps): JSX.Element {
  const { children, value } = props;
  const idPrefix = useUniquePrefix();

  const context = React.useMemo(() => {
    return { idPrefix, value };
  }, [idPrefix, value]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useTabContext(): TabContextValue | null {
  return React.useContext(Context);
}

export function getPanelId(context: TabContextValue, tabValue: string): string | undefined {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return undefined;
  }
  return `${context.idPrefix}-Panel-${tabValue}`;
}

export function getTabId(context: TabContextValue, tabValue: string): string | undefined {
  const { idPrefix } = context;
  if (idPrefix === null) {
    return undefined;
  }
  return `${context.idPrefix}-Tab-${tabValue}`;
}