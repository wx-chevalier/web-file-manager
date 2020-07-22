import React, { Component } from 'react';
import styled from 'styled-components';

import { NavContext } from '../../context/NavContext';
import { SvgIcon } from '../../elements/SvgIcon';
import { FileType, classPrefix } from '../../types';
import { FileGrid } from '../FileGrid';
import { Navigation } from '../Navigation';
import { SearchBar } from '../SearchBar';
import { SEO } from '../SEO';
import { ToggleSwitch } from '../ToggleSwitch';

interface IProps {
  fileMap: Record<string, FileType>;
  currentDirId?: string;
  withSEO?: boolean;
  isCombineEnabled?: boolean;

  onToggleSwitch?: (checked: boolean) => void;
  renderAddFileElement?: ({ onClose }: { onClose: Function }) => JSX.Element;
  onOpenMenu?: (id: string) => void;
  onAdd?: (file: FileType) => void;
  onDelete?: (id: string, isDir: boolean) => void;
  onEnter?: (id: string) => void;
  onCopyTo?: (file: FileType) => void;
  onClickPreview?: (file: FileType) => void;
  onMoveTo?: ({
    ids,
    targetCategoryId,
    showModal
  }: {
    showModal?: boolean;
    targetCategoryId?: string;
    ids?: { entryId: string; isDir: boolean }[];
  }) => void;
}

interface IState {
  isMultiple: boolean;
  currentDirId: string;
}

export class UfFileManager extends Component<IProps, IState> {
  static defaultProps = {
    withSEO: false
  };

  state = { currentDirId: this.props.currentDirId, isMultiple: false };

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
      onMoveTo,
      onClickPreview,
      onToggleSwitch
    } = this.props;
    const { isMultiple, currentDirId } = this.state;

    return (
      <NavContext.Provider
        value={{
          fileMap,
          currentDirId,
          isCombineEnabled,
          onMoveTo,
          onClickPreview,
          onToggleSwitch,
          renderAddFileElement,
          onUpdateCurrentDir: this.onUpdateCurrentDir
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
            <ToggleSwitch
              checkedChildren={'多选'}
              unCheckedChildren={'单选'}
              checkedValue={isMultiple}
              style={{ marginLeft: 12 }}
              onChange={isMultiple => {
                this.setState({ isMultiple });
                onToggleSwitch(isMultiple);
              }}
            />
          </TopBar>
          <FileGrid isMultiple={isMultiple} onAdd={onAdd} onDelete={onDelete} />
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
  align-items: center;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
