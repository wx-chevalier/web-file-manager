import React, { Component, Fragment } from 'react';

import { NavContextProps, withContext } from '../../context/NavContext';
import { FileType } from '../../types';

import { DropDownIcon, LinkContainer } from './styles';
import { Collapse } from './Collapse';

interface IProps extends NavContextProps {
  fileTree: FileType[];
}

interface IState {
  fileTree: FileType[] | null;
}

class SideMenuComp extends Component<IProps, IState> {
  state: IState = {
    fileTree: null
  };

  static getDerivedStateFromProps(nextProps: IProps) {
    return {
      fileTree: nextProps.fileTree
    };
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(
  //     entriesAreSame(nextProps.fileStructure, this.props.fileStructure)
  //   );
  //   if (entriesAreSame(nextProps.fileStructure, this.props.fileStructure)) {
  //     return false;
  //   }
  //   return true;
  // }

  renderTree = (children: FileType[], value: number) => {
    const i = value + 1;

    return children && children.length > 0
      ? children.map((entry, _) => {
          if (!entry.isDir) return;
          const flag = entry.children ? (entry.children.length ? true : false) : false;
          if (!flag) {
            return (
              <LinkContainer
                key={entry.id}
                onClick={() => this.props.onUpdateCurrentDir(entry.id)}
                className={this.props.currentDirId === entry.id ? 'selected' : ''}
              >
                <div className="link" style={{ marginLeft: `${10 * i}px` }}>
                  {entry.name}
                </div>
              </LinkContainer>
            );
          }
          return (
            <Collapse index={i} key={entry.id}>
              {(visible: boolean, setVisible: Function) => {
                return (
                  <Fragment>
                    <LinkContainer
                      key={entry.id}
                      className={this.props.currentDirId === entry.id ? 'selected' : ''}
                    >
                      <div
                        className="link"
                        style={{
                          marginLeft: `${10 * i}px`,
                          width: '100%'
                        }}
                        onClick={() => this.props.onUpdateCurrentDir(entry.id)}
                      >
                        {entry.name}
                      </div>
                      <div className="dropdown" onClick={() => setVisible()}>
                        <DropDownIcon className={visible ? '' : 'clicked'} />
                      </div>
                    </LinkContainer>
                    <div style={{ position: 'relative' }}>
                      {visible ? this.renderTree(entry.children, i) : ''}
                    </div>
                  </Fragment>
                );
              }}
            </Collapse>
          );
        })
      : '';
  };

  render() {
    return <Fragment>{this.renderTree(this.state.fileTree, 0)}</Fragment>;
  }
}

export const SideMenu = withContext(SideMenuComp);
