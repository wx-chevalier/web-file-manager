import React, { Component } from 'react';
import styled from 'styled-components';

import { NavContext } from '../../context/NavContext';
import { FileType } from '../../types';
import { FileGrid } from '../FileGrid';
import { Navigation } from '../Navigation';
import { SearchBar } from '../SearchBar';

interface IProps {
  fileMap: Record<string, FileType>;

  currentPath?: string;

  onAdd?: (file: FileType) => void;
  onDelete?: (id: string) => void;
}

interface IState {
  currentPath: string;
}

export class UfFileManager extends Component<IProps, IState> {
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
    const { fileMap, onAdd, onDelete } = this.props;
    const { currentPath } = this.state;

    return (
      <NavContext.Provider value={{ fileMap, currentPath, onUpdatePath: this.onUpdatePath }}>
        <Container>
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
