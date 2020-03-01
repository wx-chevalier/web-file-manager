import React, { Component, createRef } from 'react';

import { withContext } from '../../context/NavContext';
import { SvgIcon } from '../../elements/SvgIcon';
import { FileType, StyleObject, getFileExt } from '../../types';
import { FileInfo } from '../FileInfo';
import { Menu } from '../Menu';

import { Container, Img, Logo, Name } from './styles';

interface IProps {
  entry: FileType;

  deleteFn: Function;
}

interface IState {
  visible: boolean;
  showInfo: boolean;
  style: StyleObject;
  prevStyle?: StyleObject;
}

class FileIconComp extends Component<IProps, IState> {
  nodeRef = createRef<HTMLDivElement>();

  state = {
    visible: false,
    showInfo: false,
    style: {
      right: 0,
      left: 0
    },
    prevStyle: {}
  };

  componentDidMount() {
    document.addEventListener('contextmenu', this._handleContextMenu);

    document.addEventListener('click', this._handleMouseLeave);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu);

    document.removeEventListener('click', this._handleMouseLeave);
  }

  _handleContextMenu = (event: any) => {
    event.preventDefault();

    const path = event.composedPath();

    const wasOutside = !path.includes(this.nodeRef.current) || false;

    if (wasOutside) {
      this.setState({
        visible: false,
        style: {
          right: 0,
          left: 0
        },
        prevStyle: {
          right: 0,
          left: 0
        }
      });
      return;
    }

    const clickX = event.clientX;
    const clickY = event.clientY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const rootW = this.nodeRef.current.offsetWidth;
    const rootH = this.nodeRef.current.offsetHeight;

    const right = screenW - clickX > rootW;
    const left = !right;
    const top = screenH - clickY > rootH;
    const bottom = !top;

    const style: StyleObject = {
      left: 0,
      top: 0
    };

    if (right) {
      style.left = `${clickX + 5}px`;
    }

    if (left) {
      style.left = `${clickX - rootW - 5}px`;
    }

    if (top) {
      style.top = `${clickY + 5}px`;
    }

    if (bottom) {
      style.top = `${clickY - rootH - 5}px`;
    }

    const prevStyle = {
      top: style.top,
      left: style.left
    };

    this.setState({
      style,
      visible: true,
      prevStyle
    });
  };

  _handleMouseLeave = (event: any) => {
    const { visible } = this.state;
    const wasOutside = !(event.target.contains === this.nodeRef.current);

    if (wasOutside && visible)
      this.setState({
        visible: false,
        style: {
          right: 0,
          left: 0
        }
      });
  };

  _handleClick = (event: any) => {
    const { visible } = this.state;
    const wasOutside = !(event.target.contains === this.nodeRef);

    if (wasOutside && visible)
      this.setState({
        visible: false,
        style: {
          right: 0,
          left: 0
        }
      });
  };

  _handleScroll = () => {
    const { visible } = this.state;

    if (visible)
      this.setState({
        visible: false,
        style: {
          right: 0,
          left: 0
        }
      });
  };

  handleDelete = () => {
    this.props.deleteFn();
  };

  enterFolder = () => {
    if (this.props.entry.type === FOLDER) this.props.history.push(this.props.entry.path);
  };

  render() {
    const { entry } = this.props;

    const ext = getFileExt(entry);

    return (
      <Container ref={this.nodeRef}>
        <Logo onClick={() => this.enterFolder()}>
          <Img
            src={
              ((entry.isDir ? (
                <SvgIcon name="folder" />
              ) : (
                <SvgIcon name="file" />
              )) as unknown) as string
            }
          />
          {!entry.isDir ? <span>{`.${ext}`}</span> : ''}
        </Logo>
        <Name>{entry.name}</Name>
        {this.state.visible && (
          <Menu
            style={this.state.style}
            content={[
              {
                info: 'Open',
                onClick: () => {
                  entry.type === FOLDER
                    ? this.props.history.push(this.props.entry.path)
                    : this.setState({
                        showInfo: true
                      });
                }
              },
              {
                info: 'Get Info',
                onClick: () =>
                  this.setState({
                    showInfo: true
                  })
              },
              {
                info: 'Delete',
                style: { color: 'red' },
                onClick: () => {
                  this.handleDelete();
                }
              }
            ]}
          />
        )}
        {this.state.showInfo ? (
          <FileInfo
            title="File Info"
            style={this.state.prevStyle}
            closeFn={() =>
              this.setState({
                showInfo: false
              })
            }
            entry={{
              type: entry.type,
              name: entry.name,
              path: '/',
              ext: ext,
              size: entry.size,
              date: entry.createdAt,
              creatorName: entry.creatorName
            }}
          />
        ) : (
          ''
        )}
      </Container>
    );
  }
}

export const FileIcon = withContext<IProps>(FileIconComp);
