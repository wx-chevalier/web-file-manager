import React, { Component } from 'react';
import styled from 'styled-components';

import { NavContext } from '../../context/NavContext';
import { SvgIcon } from '../../elements/SvgIcon';
import { FileType, classPrefix } from '../../types';
import { FileGrid } from '../FileGrid';
import { Navigation } from '../Navigation';
import { SearchBar } from '../SearchBar';
import { SEO } from '../SEO';

interface IProps {
  fileMap: Record<string, FileType>;
  currentPath?: string;
  withSEO?: boolean;

  addFileElement?: JSX.Element;

  onAdd?: (file: FileType) => void;
  onDelete?: (id: string) => void;
  onEnter?: (id: string) => void;
  onMoveTo?: (file: FileType) => void;
  onCopyTo?: (file: FileType) => void;
  onClickPreview?: (file: FileType) => void;
}

interface IState {
  currentPath: string;
}

export class UfFileManager extends Component<IProps, IState> {
  static defaultProps = {
    withSEO: false
  };

  state = { currentPath: this.props.currentPath || '/' };

  componentWillReceiveProps(nextProps: IProps) {
    // 当外部传入的 Path 发生变化时候
    if (nextProps.currentPath !== this.props.currentPath) {
      this.onUpdatePath(nextProps.currentPath);
    }
  }

  onUpdatePath = (currentPath: string) => {
    this.setState({ currentPath });
  };

  render() {
    const { fileMap, withSEO, onAdd, onDelete } = this.props;
    const { currentPath } = this.state;

    return (
      <NavContext.Provider
        value={{
          fileMap,
          currentPath,
          onEnter: this.props.onEnter,
          onUpdatePath: this.onUpdatePath,
          onClickPreview: this.props.onClickPreview
        }}
      >
        {withSEO && (
          <SEO
            url={currentPath}
            title={currentPath}
            image={((<SvgIcon name="folder" size={50} />) as unknown) as string}
            description={currentPath}
          />
        )}
        <Container className={`${classPrefix}-file-manager-container`}>
          <TopBar>
            <Navigation />
            <SearchBar />
          </TopBar>
          <FileGrid onAdd={onAdd} onDelete={onDelete} />
        </Container>
      </NavContext.Provider>
    );
  }
}

const Container = styled.div`
  padding: 41px;
  transition: margin-left 250ms ease-in;
  @media screen and (max-width: 768px) {
    margin-left: 0;
    padding: 55px 15px 15px 15px;
  }
`;

const TopBar = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
