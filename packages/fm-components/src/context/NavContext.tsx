import React, { createContext } from 'react';

export interface NavContextProps {
  currentPath?: string;
  onUpdatePath?: (newPath: string) => void;
}

export const NavContext: React.Context<NavContextProps> = createContext<NavContextProps>({
  currentPath: '/'
});

export const withContext = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof NavContextProps>> => props => (
  <NavContext.Consumer>
    {({ currentPath, onUpdatePath }) => (
      <Component {...(props as P)} currentPath={currentPath} onUpdatePath={onUpdatePath} />
    )}
  </NavContext.Consumer>
);
