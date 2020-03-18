export interface FileType {
  // ID
  id?: string;

  // 是否为目录
  isDir: boolean;
  // 文件类型
  ext?: string;

  // 名称
  name?: string;
  // 创建者
  creatorName?: string;
  // 路径，完整的文件路径
  path?: string;
  // 大小 in Bytes
  size?: number;

  // 创建、更新、删除的时间
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  // 父路径，对于文件，就是所在文件夹的路径；对于文件夹，就是父文件夹路径
  parentPath?: string | null;
  // 父文件夹 id
  parentId?: string | null;

  // 子路径，字符串或者文件类型
  childrenIds?: string[];
  children?: FileType[];
}
