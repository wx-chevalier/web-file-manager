import React, { Component, createRef } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

import { NavContextProps, withContext } from '../../context/NavContext';
import { SvgIcon } from '../../elements/SvgIcon';
import { FileType, StyleObject, getFileExt } from '../../types';
import { FileInfo } from '../FileInfo';
import { Menu } from '../Menu';

import { Container, Logo, Name } from './styles';

interface IProps extends NavContextProps {
  index: number | string;
  entry: FileType;

  isMultiple?: boolean;
  provided?: DraggableProvided;
  snapshot?: DraggableStateSnapshot;
  multipledEntryIds?: { entryId: string; isDir: boolean }[];

  onDelete: Function;

  onMultipleSelect?: (entryId: string, isDir: boolean, isChecked: boolean) => void;
}

interface IState {
  visible: boolean;
  showInfo: boolean;
  style: StyleObject;
  isChecked?: boolean;
  prevStyle?: StyleObject;
}

class FileIconComp extends Component<IProps, IState> {
  nodeRef = createRef<HTMLDivElement>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      showInfo: false,
      style: {
        right: 0,
        left: 0
      },
      prevStyle: {},
      isChecked: false
    };
  }

  componentDidMount() {
    document.addEventListener('contextmenu', this._handleContextMenu);
    document.addEventListener('click', this._handleMouseLeave);
  }

  componentWillUnmount() {
    document.removeEventListener('contextmenu', this._handleContextMenu);
    document.removeEventListener('click', this._handleMouseLeave);
  }

  componentDidUpdate(prevProps: IProps) {
    const { isMultiple } = this.props;
    // 从多选模式切回单选时取消 文件或文件夹的选中状态
    if (prevProps.isMultiple !== isMultiple && !isMultiple) {
      this.setState({ isChecked: false });
    }
  }

  _handleContextMenu = (event: any) => {
    event.preventDefault();

    const path = event.composedPath();

    const wasOutside = !path.includes(this.nodeRef.current) || false;

    if (wasOutside && !this.props.isMultiple) {
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
      prevStyle,
      visible: true
    });
  };

  _handleMouseLeave = (event: any) => {
    const { visible } = this.state;
    const wasOutside = !(event.target && this.nodeRef.current.contains(event.target));

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

  handleDelete = async () => {
    await this.props.onDelete();
    this.setState({ visible: false });
  };

  enterFolder = () => {
    if (this.props.entry.isDir) {
      const { onUpdateCurrentDir } = this.props;

      onUpdateCurrentDir(this.props.entry.id);
    } else {
      // 对于文件夹，直接打开
      this.setState({
        style: {
          top:
            this.nodeRef.current.offsetTop +
            this.nodeRef.current.getBoundingClientRect().height / 2,
          left:
            this.nodeRef.current.offsetLeft + this.nodeRef.current.getBoundingClientRect().width / 2
        },
        prevStyle: this.state.style,
        visible: true
      });
    }
  };

  render() {
    const { isChecked } = this.state;
    const { isMultiple, multipledEntryIds, entry, onMoveTo, onMultipleSelect } = this.props;

    const ext = getFileExt(entry);

    return (
      <Container
        ref={this.nodeRef}
        style={{ background: isChecked && isMultiple ? '#e6f5ff' : 'unset' }}
      >
        <Logo
          onClick={
            this.props.entry.isDir && !isMultiple
              ? this.enterFolder
              : isMultiple
              ? () => {
                  this.setState({ isChecked: !isChecked }, () => {
                    onMultipleSelect(entry.id, entry.isDir, this.state.isChecked);
                  });
                }
              : null
          }
        >
          {entry.isDir ? <SvgIcon name="folder" size={50} /> : <SvgIcon name="file" size={50} />}
          {!entry.isDir ? <span>{`.${ext}`}</span> : ''}
        </Logo>
        <Name>{entry.name}</Name>
        {this.state.visible && (
          <Menu
            style={this.state.style}
            content={[
              !isMultiple && {
                info: '打开',
                onClick: () => {
                  entry.isDir
                    ? this.props.onUpdateCurrentDir(this.props.entry.id)
                    : this.props.onClickPreview
                    ? this.props.onClickPreview(this.props.entry)
                    : this.setState({
                        showInfo: true
                      });
                }
              },
              !isMultiple && {
                info: '详情',
                onClick: () =>
                  this.setState({
                    showInfo: true
                  })
              },
              {
                info: '移动/复制',
                onClick: () =>
                  onMoveTo({
                    showModal: true,
                    ids: isMultiple
                      ? multipledEntryIds
                      : [{ entryId: entry.id, isDir: entry.isDir }]
                  })
              },
              {
                info: '删除',
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
            onClose={() =>
              this.setState({
                showInfo: false
              })
            }
            entry={{
              isDir: entry.isDir,
              name: entry.name,
              path: '/',
              ext: ext,
              size: entry.size,
              createdAt: entry.createdAt,
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
