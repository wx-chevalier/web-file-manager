import React from 'react';

import { NavContextProps, withContext } from '../../context/NavContext';
import { getGoBackPath } from '../../types';

import { Container, Path } from './styles';
import GoBack from './GoBack';

export const renderPath = (path: string) => {
  const pathArr = path.split('/').filter(p => p);
  const len = pathArr.length;
  const arr = [<span key={0}>{` root `}</span>];

  pathArr.map((p, _) => {
    _ === len - 1
      ? arr.push(
          <span className="currentPath" key={_ + 1}>
            / {p}
          </span>
        )
      : arr.push(<span key={_ + 1}>{` / ${p} `}</span>);
  });

  return arr;
};

interface IProps extends NavContextProps {}

const NavigationComp = (props: IProps) => {
  return (
    <Container>
      <div
        style={{ marginTop: 3, cursor: 'pointer' }}
        onClick={() => {
          props.currentPath === '/' ? null : props.onUpdatePath(getGoBackPath(props.currentPath));
        }}
      >
        <GoBack fill={props.currentPath === '/' ? '#acb9c3' : '#545B61'} />
      </div>
      <Path>{renderPath(props.currentPath)}</Path>
    </Container>
  );
};

export const Navigation = withContext<IProps>(NavigationComp);
