import React, { createContext } from 'react';

import { FileType } from '../types';

export interface NavContextProps {
  currentPath?: string;
  fileMap?: Record<string, FileType>;

  onEnter?: Function;
  onUpdatePath?: (newPath: string) => void;
}

export const NavContext: React.Context<NavContextProps> = createContext<NavContextProps>({
  currentPath: '/'
});

export const withContext = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof NavContextProps>> => props => (
  <NavContext.Consumer>
    {({ fileMap, currentPath, onUpdatePath, onEnter }) => (
      <Component
        {...(props as P)}
        fileMap={fileMap}
        onEnter={onEnter}
        currentPath={currentPath}
        onUpdatePath={onUpdatePath}
      />
    )}
  </NavContext.Consumer>
);
