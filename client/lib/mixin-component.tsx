import { CSSProperties, ReactElement, ReactNode } from "react";

export const mixinComponent = <P extends { children?: ReactNode; style?: CSSProperties }>(Component: (props: P) => ReactElement, inject: P) => {
  const mixedComponent = (p: P) => {
    const { children, style: oldStyle, ...props } = p;
    const { style: newStyle } = inject;
    const style = { ...oldStyle, ...newStyle };
    const injected = { ...props, ...inject, style };
    return <Component {...injected}>{children}</Component>;
  };
  return mixedComponent;
};
