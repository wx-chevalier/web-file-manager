import React, { Component } from 'react';
import styled from 'styled-components';

import { NavContext } from '../../context/NavContext';
import Navigation from '../Navigation';

interface IProps {
  currentPath: string;
}

interface IState {
  currentPath: string;
}

export class UfFileManager extends Component<IProps, IState> {
  state = { currentPath: '/' };

  onUpdatePath = (currentPath: string) => {
    this.setState({ currentPath });
  };

  render() {
    const { currentPath } = this.state;

    return (
      <NavContext.Provider value={{ currentPath, onUpdatePath: this.onUpdatePath }}>
        <Container>
          <TopBar>
            <Navigation />
            <SearchBar />
          </TopBar>
          <Grid />
        </Container>
      </NavContext.Provider>
    );
  }
}

const Container = styled.div`
  padding: 41px;
  margin-left: 320px;
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
