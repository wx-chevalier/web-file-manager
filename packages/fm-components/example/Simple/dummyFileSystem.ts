import { FileType } from '../../src';

export const dummyFileSystem: Record<string, FileType> = {
  '0': { id: '0', name: '根目录', path: '/', isDir: true },
  '31258': {
    id: '31258',
    name: '6.stl.zlib',
    isDir: false,
    parentId: '0'
  },
  '31259': {
    id: '31259',
    name: '1.stl.zlib',
    isDir: true,
    parentId: '0',
    path: '/1.stl.zlib'
  },
  '31260': {
    id: '31260',
    name: '2.netfabb.stl.zlib',
    isDir: false,
    parentId: '0'
  },
  '31261': {
    id: '31261',
    name: '2.stl.zlib',
    isDir: false,
    parentId: '0'
  },
  '31262': {
    id: '31262',
    name: '2.netfabb.stl.zlib',
    isDir: false,
    parentId: '0'
  },
  '31263': {
    id: '31263',
    name: '2.stl.zlib',
    isDir: false,
    parentId: '0'
  },
  '31264': {
    id: '31264',
    name: 'test1',
    isDir: true,
    parentId: '31259',
    path: '/1.stl.zlib/test1'
  },
  '31265': {
    id: '31265',
    name: 'test2',
    isDir: true,
    parentId: '31264',
    path: '/1.stl.zlib/test1/test2'
  }
};
// {
//   '1382b6993e9f270cb1c29833be3f5750': {
//     isDir: true,
//     name: 'root',
//     path: '/',
//     size: 0,
//     createdAt: '2019-04-07',
//     creatorName: 'admin',
//     parentId: null
//   },
//   '9b6739960c1ac83251046da2c718019b': {
//     isDir: true,
//     name: 'apps',
//     creatorName: 'Shubham Singh',
//     size: 223,
//     createdAt: '2019-04-29',
//     parentId: '1382b6993e9f270cb1c29833be3f5750',
//     path: '/apps'
//   },
//   '147d0ef33fe657ce53a83de6a630473d': {
//     isDir: true,
//     name: 'pictures',
//     creatorName: 'Shubham Singh',
//     size: 23,
//     createdAt: '2019-04-29',
//     parentId: '1382b6993e9f270cb1c29833be3f5750',
//     path: '/pictures'
//   },
//   a55cfa9e1bf87138edd25c4b1553104d: {
//     isDir: true,
//     name: 'videos',
//     creatorName: 'Shubham Singh',
//     size: 0,
//     createdAt: '2019-04-29',
//     parentId: '1382b6993e9f270cb1c29833be3f5750',
//     path: '/videos'
//   },
//   '5f2b4d35489a8617e574060b19b7cad9': {
//     isDir: true,
//     name: 'docs',
//     creatorName: 'Shubham Singh',
//     size: 233,
//     createdAt: '2019-04-29',
//     parentId: '1382b6993e9f270cb1c29833be3f5750',
//     path: '/docs'
//   },
//   ab7e413a3798155e37a9361140522e39: {
//     isDir: false,
//     name: 'a.pdf',
//     creatorName: 'Shubham Singh',
//     size: 234,
//     createdAt: '2019-04-29',
//     parentId: '1382b6993e9f270cb1c29833be3f5750',
//     path: '/a.pdf'
//   },
//   '891debd77d0bc40d30ff7d7e6c628e9f': {
//     isDir: false,
//     name: 'b.jpg',
//     creatorName: 'Shubham Singh',
//     size: 234,
//     createdAt: '2019-04-29',
//     parentId: '1382b6993e9f270cb1c29833be3f5750',
//     path: '/b.jpg'
//   },
//   '2d03459789f153918dfc0be413fe9987': {
//     isDir: true,
//     name: 'work',
//     creatorName: 'Shubham Singh',
//     size: 200,
//     createdAt: '2019-04-29',
//     parentId: '5f2b4d35489a8617e574060b19b7cad9',
//     path: '/docs/work'
//   },
//   '2d03459789f153918dfc0be413fe9986': {
//     isDir: true,
//     name: 'study',
//     creatorName: 'Shubham Singh',
//     size: 200,
//     createdAt: '2019-04-29',
//     parentId: '5f2b4d35489a8617e574060b19b7cad9',
//     path: '/docs/work/study'
//   },
//   '8f7c5959dbb088c0aef8b145dbdf6e43': {
//     isDir: false,
//     name: 'c.pdf',
//     creatorName: 'Shubham Singh',
//     size: 200,
//     createdAt: '2019-04-29',
//     parentId: '5f2b4d35489a8617e574060b19b7cad9',
//     path: '/docs/c.pdf'
//   },
//   '579c51eec02e43b4dfad314e05365fe4': {
//     isDir: false,
//     name: 'd.docx',
//     creatorName: 'Shubham Singh',
//     size: 235,
//     createdAt: '2019-04-29',
//     parentId: '5f2b4d35489a8617e574060b19b7cad9',
//     path: '/docs/d.docx'
//   },
//   b42eff45517edc2e543b3d2750bd08c3: {
//     isDir: false,
//     name: 'e.pdf',
//     creatorName: 'Shubham Singh',
//     size: 0,
//     createdAt: '2019-04-29',
//     parentId: '2d03459789f153918dfc0be413fe9987',
//     path: '/docs/work/e.pdf'
//   },
//   '00ce12a7746322ce403e17992674f81b': {
//     isDir: false,
//     name: 'f.ts',
//     creatorName: 'Shubham Singh',
//     size: 235,
//     createdAt: '2019-04-29',
//     parentId: '2d03459789f153918dfc0be413fe9987',
//     path: '/docs/work/f.ts'
//   }
// };

Object.keys(dummyFileSystem).forEach(id => {
  dummyFileSystem[id] = { id, ...dummyFileSystem[id] };
});
