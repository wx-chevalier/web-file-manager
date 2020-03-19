export interface FileType {
  // ID
  id?: string;
  // 父文件夹 id
  parentId?: string | null;

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

  // 子路径，字符串或者文件类型
  childrenIds?: string[];
  children?: FileType[];

  // 用于记述原始对象
  originObj?: any;
}
