import React, { useState } from 'react';

import { NavContextProps, withContext } from '../../context/NavContext';
import { FileType } from '../../types';

import { Root, ShowMenu, SideBarContainer } from './styles';
import { SideMenu } from './SideMenu';

interface IProps extends NavContextProps {
  fileTree: FileType[];
}

const SidebarComp = ({ fileTree, onUpdatePath }: IProps) => {
  const children = fileTree[0].children;

  const [toggle, handleToggle] = useState(true);

  return (
    <SideBarContainer toggle={toggle}>
      <ShowMenu onClick={() => handleToggle(!toggle)} />
      <a
        className="rootLink"
        onClick={() => {
          onUpdatePath('/');
        }}
      >
        <Root />
      </a>
      <SideMenu fileTree={children} />
    </SideBarContainer>
  );
};

export const Sidebar = withContext(SidebarComp);
