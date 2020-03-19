import { FileType } from './FileType';

/** 获取全部路径的集合 */
export const getPathSet = (fileMap: Record<string, FileType>) => {
  const pathSet = new Set<string>();

  Object.keys(fileMap).forEach(id => {
    pathSet.add(fileMap[id].path);
    pathSet.add(id);
  });

  return pathSet;
};

/** 从 fileMap 中获取到根文件夹 id */
export const getRootDirId = (fileMap: Record<string, FileType>) => {
  let dirId: string | null = null;

  Object.keys(fileMap).forEach(id => {
    if (fileMap[id].path === '/') {
      dirId = id;
    }
  });

  return dirId;
};

export const getIdByPath = (path: string, fileMap: Record<string, FileType>) => {
  let dirId: string | null = null;

  Object.keys(fileMap).forEach(id => {
    if (fileMap[id].path === path) {
      dirId = id;
    }
  });

  return dirId;
};

/** 获取返回的路径 */
export const getGoBackPath = (path: string) => {
  const newPath = path.split('/');

  newPath.splice(newPath.length - 1, 1);

  return newPath.join('/') || '/';
};

/** 根据某个路径获取当前的文件列表 */
export function getDirFiles(dirId: string, fileMap: Record<string, FileType>) {
  const files: FileType[] = [];

  Object.keys(fileMap).forEach(id => {
    if (fileMap[id].parentId === dirId) {
      files.push(fileMap[id]);
    }
  });

  return files;
}
