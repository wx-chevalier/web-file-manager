import _ from 'lodash';
import React from 'react';

import { NavContextProps, withContext } from '../../context/NavContext';
import { getRootDirId, getIdByPath } from '../../types';

import { Container, Path } from './styles';
import GoBack from './GoBack';

export const renderPath = (path: string, onClickPath?: Function) => {
  const pathArr = path.split('/').filter(p => p);
  const len = pathArr.length;
  const arr = [
    <span onClick={() => onClickPath('/')} style={{ cursor: 'pointer' }} key={0}>{` root `}</span>
  ];

  pathArr.map((p, _) => {
    _ === len - 1
      ? arr.push(
          <span className="currentDirId" key={_ + 1}>
            / {p}
          </span>
        )
      : arr.push(
          <span
            onClick={() => onClickPath(p)}
            style={{ cursor: 'pointer' }}
            key={_ + 1}
          >{` / ${p} `}</span>
        );
  });

  return arr;
};

interface IProps extends NavContextProps {}

const NavigationComp = (props: IProps) => {
  const onClickPath = (path: string) => {
    props.onUpdateCurrentDir(getIdByPath(path, props.fileMap));
  };

  const rootId = getRootDirId(props.fileMap);

  return (
    <Container>
      <div
        style={{ marginTop: 3, cursor: 'pointer' }}
        onClick={() => {
          if (props.currentDirId !== rootId && props.fileMap[props.currentDirId]) {
            props.onUpdateCurrentDir(props.fileMap[props.currentDirId].parentId);
          }
        }}
      >
        <GoBack fill={props.currentDirId === rootId ? '#acb9c3' : '#545B61'} />
      </div>
      <Path>
        {props.fileMap[props.currentDirId] &&
          renderPath(props.fileMap[props.currentDirId].path, onClickPath)}
      </Path>
    </Container>
  );
};

export const Navigation = withContext<IProps>(NavigationComp);
