import React, { createContext } from 'react';

import { FileType } from '../types';

export interface NavContextProps {
  currentDirId?: string;
  fileMap?: Record<string, FileType>;
  renderAddFileElement?: ({ onClose }: { onClose: Function }) => void;

  onUpdateCurrentDir?: (newPath: string) => void;
  onClickPreview?: (file: FileType) => void;
}

export const NavContext: React.Context<NavContextProps> = createContext<NavContextProps>({
  currentDirId: '/'
});

export const withContext = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<Omit<P, keyof NavContextProps>> => props => (
  <NavContext.Consumer>
    {({ fileMap, renderAddFileElement, currentDirId, onUpdateCurrentDir, onClickPreview }) => (
      <Component
        {...(props as P)}
        renderAddFileElement={renderAddFileElement}
        fileMap={fileMap}
        currentDirId={currentDirId}
        onUpdateCurrentDir={onUpdateCurrentDir}
        onClickPreview={onClickPreview}
      />
    )}
  </NavContext.Consumer>
);
