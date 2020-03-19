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
      currentDirId="1382b6993e9f270cb1c29833be3f5750"
      renderAddFileElement={() => <div>点击上传</div>}
      onAdd={file => {
        console.log(file);
      }}
      onEnter={consoleEntry}
      onClickPreview={(entry: FileType) => alert(`preview ${entry.name}`)}
    />
  );
}
