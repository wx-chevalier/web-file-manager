import React, { Component, createRef } from 'react';
import styled from 'styled-components';

import { StyleObject } from '../types';

import { SvgIcon } from './SvgIcon';

export interface ModalProps {
  style?: StyleObject;
  isDraggale?: boolean;
  title?: string;

  closeFn?: Function;
}

export interface IModalState {
  originalX: number;
  originalY: number;
  lastTranslateX: number;
  lastTranslateY: number;
  translateX: number;
  translateY: number;
  isDragging: boolean;
}

export const withModal = <CompProps extends ModalProps>(WrappedComponent: React.ComponentType) => (
  params: ModalProps
) =>
  class Modal extends Component<CompProps, IModalState> {
    _ref = createRef<HTMLDivElement>();
    state = {
      isDragging: false,
      originalX: 0,
      originalY: 0,
      translateX: 0,
      translateY: 0,
      lastTranslateX: 0,
      lastTranslateY: 0
    };

    componentDidMount() {}

    componentWillUnmount() {
      this._ref.current.removeEventListener('mousemove', this.handleMouseMove);
      this._ref.current.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseDown = ({ clientX, clientY }: MouseEvent) => {
      if (this.props.isDraggale) {
        return;
      }

      this._ref.current.addEventListener('mousemove', this.handleMouseMove);
      this._ref.current.addEventListener('mouseup', this.handleMouseUp);

      this.setState({
        originalX: clientX,
        originalY: clientY,
        isDragging: true
      });
    };

    handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      const { isDragging } = this.state;
      if (!isDragging) {
        return;
      }

      this.setState(prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY
      }));
    };

    handleMouseUp = () => {
      this._ref.current.removeEventListener('mousemove', this.handleMouseMove);
      this._ref.current.removeEventListener('mouseup', this.handleMouseUp);

      this.setState({
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,

        isDragging: false
      });
    };

    render() {
      const { translateX, translateY } = this.state;
      const style = params.style ? params.style : this.props.style ? this.props.style : {};
      return (
        <Container
          style={{
            ...style,
            transform: `translate(${translateX}px, ${translateY}px)`
          }}
          onMouseDown={this.handleMouseDown as any}
          onMouseUp={this.handleMouseUp}
          className="draggable"
          ref={this._ref}
        >
          <Heading>
            <Title>{this.props.title}</Title>
            <Close onClick={this.props.closeFn as React.MouseEventHandler}>
              <SvgIcon name="close" size={15} color="#82878B" />
            </Close>
          </Heading>

          <WrappedComponent {...this.props} />
        </Container>
      );
    }
  };

const Container = styled.div`
  width: 316px;
  position: relative;
  z-index: 4000;
  padding: 20px 0 44px;
  background: #fff;
  border: 1px solid rgba(221, 224, 228, 0.7);
  box-shadow: 0 16px 64px 0 rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

const Title = styled.div`
  font-family: Lato, sans-serif;
  font-size: 18px;
  color: #2f363f;
  letter-spacing: 0;
`;

const Heading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 24px;
  padding: 13px;
  cursor: pointer;
`;
