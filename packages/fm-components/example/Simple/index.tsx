import * as React from 'react';

import { FileType, UfFileManager } from '../../src';

import { dummyFileSystem } from './dummyFileSystem';

const consoleEntry = (param?: any) => {
  console.log('entry', param);
};

export default function Simple() {
  return (
    <UfFileManager
      fileMap={dummyFileSystem}
      currentDirId="0"
      renderAddFileElement={() => <div>点击上传</div>}
      onAdd={file => {
        console.log(file);
      }}
      onDelete={(id, isDir) => console.log(id, isDir)}
      isCombineEnabled={true}
      onEnter={consoleEntry}
      onMoveTo={(ids, targetId) => console.log('ids', ids, 'target', targetId)}
      onClickPreview={(entry: FileType) => alert(`preview ${entry.name}`)}
    />
  );
}
