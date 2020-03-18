import React, { createContext } from 'react';

import { FileType } from '../types';

export interface NavContextProps {
  currentPath?: string;
  fileMap?: Record<string, FileType>;
  addFileElement?: JSX.Element;

  onEnter?: (id: string) => void;
  onUpdatePath?: (newPath: string) => void;
  onClickPreview?: (file: FileType) => void;
}

export const NavContext: React.Context<NavContextProps> = createContext<NavContextProps>({
  currentPath: '/'
});

export const withContext = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof NavContextProps>> => props => (
  <NavContext.Consumer>
    {({ fileMap, addFileElement, currentPath, onUpdatePath, onEnter, onClickPreview }) => (
      <Component
        {...(props as P)}
        addFileElement={addFileElement}
        fileMap={fileMap}
        onEnter={onEnter}
        currentPath={currentPath}
        onUpdatePath={onUpdatePath}
        onClickPreview={onClickPreview}
      />
    )}
  </NavContext.Consumer>
);
