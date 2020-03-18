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
      currentPath="/apps"
      addFileElement={<div>点击上传</div>}
      onAdd={file => {
        console.log(file);
      }}
      onEnter={consoleEntry}
      onClickPreview={(entry: FileType) => alert(`preview ${entry.name}`)}
    />
  );
}
