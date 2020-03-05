import * as React from 'react';

import { UfFileManager } from '../../src';

import { dummyFileSystem } from './dummyFileSystem';

export default function Simple() {
  return <UfFileManager fileMap={dummyFileSystem} currentPath="/apps" />;
}
