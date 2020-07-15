import React, { Component } from 'react';
import styled from 'styled-components';

import { StyleObject } from '../../types';

interface IProps {
  style?: StyleObject;
  content: {
    info?: string;
    style?: StyleObject;
    onClick?: React.MouseEventHandler;
  }[];
}

interface IState {
  [key: string]: boolean;
}

export class Menu extends Component<IProps, IState> {
  state = {};

  render() {
    const { style, content } = this.props;

    return (
      <Container className="FileIcon-Menu" style={style}>
        {content.map(c => (
          <div className="content" key={c.info} style={c.style} onClick={c.onClick}>
            {c.info}
          </div>
        ))}
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
  background: white;
  width: 145px;
  z-index: 1000;
  border: 1px solid rgba(221, 224, 228, 0.5);
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  & .content {
    padding: 15px;
    transition: background 250ms ease-in;
    &:hover {
      background: #eeeff1;
    }
  }
  & .items {
    top: 0;
    left: 145px;
    position: absolute;
    background: white;
    width: 145px;
    border: 1px solid rgba(221, 224, 228, 0.5);
  }
`;
