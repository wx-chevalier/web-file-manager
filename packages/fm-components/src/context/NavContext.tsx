import React, { createContext } from 'react';

import { FileType } from '../types';

export interface NavContextProps {
  currentDirId?: string;
  fileMap?: Record<string, FileType>;
  isCombineEnabled?: boolean;
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
    {({
      fileMap,
      currentDirId,
      isCombineEnabled,
      onClickPreview,
      onUpdateCurrentDir,
      renderAddFileElement
    }) => (
      <Component
        {...(props as P)}
        fileMap={fileMap}
        currentDirId={currentDirId}
        isCombineEnabled={isCombineEnabled}
        onClickPreview={onClickPreview}
        onUpdateCurrentDir={onUpdateCurrentDir}
        renderAddFileElement={renderAddFileElement}
      />
    )}
  </NavContext.Consumer>
);
