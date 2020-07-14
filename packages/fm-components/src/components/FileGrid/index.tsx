import _ from 'lodash';
import React, { Component } from 'react';
import { DragDropContext, DragUpdate, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { NavContextProps, withContext } from '../../context/NavContext';
import { FileType, getDirFiles } from '../../types';
import { Add } from '../Add';

import { FileIconList } from './FileIconList';

interface IProps extends NavContextProps {
  onAdd: (file: FileType) => void;
  onDelete: (id: string, isDir: boolean) => void;
}

interface IState {
  files: FileType[];
  isDisableCombine: boolean;
}

class FileGridComp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      files: [],
      isDisableCombine: false
    };
  }
  // 判断路径是否准确，不准确则跳转到根路径
  componentDidMount() {
    if (this.props.currentDirId && this.props.fileMap) {
      this.onRefresh(this.props);
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (
      nextProps.currentDirId !== this.props.currentDirId ||
      nextProps.fileMap !== this.props.fileMap
    ) {
      this.onRefresh(nextProps);
    }
  }

  onRefresh(props: IProps) {
    const { currentDirId, fileMap } = props;

    const files = getDirFiles(currentDirId, fileMap);

    this.setState({ files });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.location.pathname === nextProps.location.pathname) {
  //     if (entriesAreSame(this.props.entry, nextProps.entry)) {
  //       return false;
  //     }
  //     return true;
  //   }
  //   return true;
  // }

  onDragEnd = (result: DropResult) => {
    this.setState({ isDisableCombine: false });
    // super simple, just removing the dragging item
    if (result.combine) {
      const files: FileType[] = [...this.state.files];
      files.splice(result.source.index, 1);
      this.setState({ files });
      return;
    }

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    if (result.destination.index !== result.source.index) {
      const { files } = this.state;
      const startIndex = result.source.index;
      const endIndex = result.destination.index;

      const resp = Array.from(files);
      const [removed] = resp.splice(startIndex, 1);
      resp.splice(endIndex, 0, removed);

      this.setState({ files: resp });
    }
  };

  onDragUpdate = (result: DragUpdate) => {
    const { files } = this.state;
    const { combine } = result;

    // 要移动的目标文件或目录
    const resp = (files || []).find(f => _.endsWith(result.draggableId, f.id));

    if (combine) {
      // 要移入的目标文件或目录
      const target = (files || []).find(f => _.endsWith(combine.draggableId, f.id));

      if ((target.isDir && !resp.isDir) || (target.isDir && resp.isDir)) {
        this.setState({ isDisableCombine: false });
      } else {
        this.setState({ isDisableCombine: true });
      }
    }
  };

  render() {
    const { isDisableCombine, files } = this.state;
    const { currentDirId, isCombineEnabled, onDelete } = this.props;

    return (
      <Container>
        <DragDropContext onDragEnd={this.onDragEnd} onDragUpdate={this.onDragUpdate}>
          <FileIconList
            files={files}
            listType="FileIconList"
            isCombineEnabled={isCombineEnabled && !isDisableCombine}
            extraEle={
              <Add
                onAdd={value => {
                  console.log(value);
                  this.props.onAdd({
                    ...value,
                    parentId: currentDirId
                  });
                }}
              />
            }
            onDelete={onDelete}
          />
        </DragDropContext>
      </Container>
    );
  }
}

export const FileGrid = withContext(FileGridComp);

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 40px 0;
`;
