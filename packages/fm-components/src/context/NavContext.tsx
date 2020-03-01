import React, { createContext } from 'react';

import { FileType } from '../types';

export interface NavContextProps {
  currentPath?: string;
  fileMap?: Record<string, FileType>;

  onUpdatePath?: (newPath: string) => void;
}

export const NavContext: React.Context<NavContextProps> = createContext<NavContextProps>({
  currentPath: '/'
});

export const withContext = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof NavContextProps>> => props => (
  <NavContext.Consumer>
    {({ fileMap, currentPath, onUpdatePath }) => (
      <Component
        {...(props as P)}
        fileMap={fileMap}
        currentPath={currentPath}
        onUpdatePath={onUpdatePath}
      />
    )}
  </NavContext.Consumer>
);
