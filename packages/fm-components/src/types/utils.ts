import { FileType } from './FileType';

/** 复制某个对象 */
export const cloneObj = <T>(obj: T): T => {
  if (Object(obj) !== obj) return (obj as unknown) as T;
  else if (Array.isArray(obj)) return (obj.map(cloneObj) as unknown) as T;

  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, cloneObj(v)]));
};

/** 获取文件后缀 */
export const getFileExt = (file: FileType) => {
  const ext = file.name.split('.').filter(el => el);

  return ext.length >= 2 ? ext[ext.length - 1] : '';
};

/** 判断重名的文件数目 */
export const getSameNameCnt = (fileMap: Record<string, FileType>, entry: FileType) => {
  let no = 0;

  fileMap[entry.parentId].childrenIds.forEach((elementId: string) => {
    if (fileMap[elementId].name.includes(entry.name) && fileMap[elementId].isDir === entry.isDir) {
      no++;
    }
  });

  return no;
};

/** 从 Map 当中生成 Tree */
export const generateTreeFromMap = (_fileMap: Record<string, FileType>) => {
  const rootFiles: FileType[] = [];

  const fileMap: Record<string, FileType> = cloneObj<Record<string, FileType>>(_fileMap); // create empty list to hold copy

  Object.keys(fileMap).forEach((nodeId: string) => {
    // 如果是根目录，则添加到根文件列表中
    if (!fileMap[nodeId].parentId) {
      return rootFiles.push(fileMap[nodeId]);
    }

    const parentId = fileMap[nodeId].parentId;

    if (fileMap[parentId]) {
      // 判断是否已存在父
      const index = fileMap[parentId].childrenIds.indexOf(nodeId);
      if (index > -1) {
        fileMap[parentId].children.splice(index, 1);
      } else if (fileMap[nodeId].isDir) {
        fileMap[parentId].children.push(fileMap[nodeId]);
        fileMap[parentId].childrenIds.push(nodeId);
      }
    }
  });

  return { rootFiles, fileMap };
};

/** 判断文件是否相同 */
export const entriesAreSame = (x: any, y: any) => {
  for (const p in x) {
    if (x.hasOwnProperty(p) !== y.hasOwnProperty(p)) return false;

    if (x[p] === null && y[p] !== null) return false;
    if (x[p] === null && y[p] !== null) return false;

    if (typeof x[p] === 'object') {
      if (!entriesAreSame(x[p], y[p])) {
        return false;
      }
    } else if (x[p] != y[p]) return false;
  }

  return true;
};
