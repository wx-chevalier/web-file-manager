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
  currentDirId?: string;
  withSEO?: boolean;
  isCombineEnabled?: boolean;

  renderAddFileElement?: ({ onClose }: { onClose: Function }) => JSX.Element;

  onAdd?: (file: FileType) => void;
  onDelete?: (id: string, isDir: boolean) => void;
  onEnter?: (id: string) => void;
  onMoveTo?: (file: FileType) => void;
  onCopyTo?: (file: FileType) => void;
  onClickPreview?: (file: FileType) => void;
}

interface IState {
  currentDirId: string;
}

export class UfFileManager extends Component<IProps, IState> {
  static defaultProps = {
    withSEO: false
  };

  state = { currentDirId: this.props.currentDirId };

  componentWillReceiveProps(nextProps: IProps) {
    // 当外部传入的 Path 发生变化时候
    if (nextProps.currentDirId !== this.props.currentDirId) {
      this.onUpdateCurrentDir(nextProps.currentDirId);
    }
  }

  onUpdateCurrentDir = (currentDirId: string) => {
    this.setState({ currentDirId });

    if (this.props.onEnter) {
      this.props.onEnter(currentDirId);
    }
  };

  render() {
    const {
      fileMap,
      withSEO,
      isCombineEnabled,
      renderAddFileElement,
      onAdd,
      onDelete,
      onClickPreview
    } = this.props;
    const { currentDirId } = this.state;

    return (
      <NavContext.Provider
        value={{
          fileMap,
          currentDirId,
          isCombineEnabled,
          renderAddFileElement,
          onUpdateCurrentDir: this.onUpdateCurrentDir,
          onClickPreview
        }}
      >
        {withSEO && (
          <SEO
            url={currentDirId}
            title={currentDirId}
            image={((<SvgIcon name="folder" size={50} />) as unknown) as string}
            description={currentDirId}
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
