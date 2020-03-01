import { FileType } from './FileType';

/** 获取全部路径的集合 */
export const getPathSet = (fileMap: Record<string, FileType>) => {
  const pathSet = new Set<string>();

  Object.keys(fileMap).forEach(id => {
    pathSet.add(fileMap[id].path);
  });

  return pathSet;
};

/** 获取返回的路径 */
export const getGoBackPath = (path: string) => {
  const newPath = path.split('/');

  newPath.splice(newPath.length - 1, 1);

  return newPath.join('/') || '/';
};

/** 根据某个路径获取当前的文件列表 */
export function getPathFiles(parentPath: string, fileMap: Record<string, FileType>) {
  const files: FileType[] = [];

  Object.keys(fileMap).forEach(id => {
    if (fileMap[id].parentPath === parentPath) {
      files.push(fileMap[id]);
    }
  });

  return files;
}

/** 获取某个文件夹路径关联到的文件 id */
export function getParentIdByPath(parentPath: string, fileMap: Record<string, FileType>) {
  let dirId = '';

  Object.keys(fileMap).forEach(id => {
    if (fileMap[id].path === parentPath && fileMap[id].isDir) {
      dirId = id;
    }
  });

  return dirId;
}
