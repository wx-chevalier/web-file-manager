import React, { createContext } from 'react';

import { FileType } from '../types';

export interface NavContextProps {
  currentDirId?: string;
  fileMap?: Record<string, FileType>;
  isCombineEnabled?: boolean;
  renderAddFileElement?: ({ onClose }: { onClose: Function }) => void;

  onToggleSwitch?: (checked: boolean) => void;
  onUpdateCurrentDir?: (newPath: string) => void;
  onClickPreview?: (file: FileType) => void;
  onMoveTo?: ({
    ids,
    targetCategoryId,
    showModal
  }: {
    showModal?: boolean;
    targetCategoryId?: string;
    ids?: { entryId: string; isDir: boolean }[];
  }) => void;
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
      onMoveTo,
      onClickPreview,
      onToggleSwitch,
      onUpdateCurrentDir,
      renderAddFileElement
    }) => (
      <Component
        {...(props as P)}
        fileMap={fileMap}
        currentDirId={currentDirId}
        isCombineEnabled={isCombineEnabled}
        onMoveTo={onMoveTo}
        onClickPreview={onClickPreview}
        onToggleSwitch={onToggleSwitch}
        onUpdateCurrentDir={onUpdateCurrentDir}
        renderAddFileElement={renderAddFileElement}
      />
    )}
  </NavContext.Consumer>
);
