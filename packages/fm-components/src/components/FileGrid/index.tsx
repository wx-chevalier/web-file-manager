import React, { Component } from 'react';
import styled from 'styled-components';

import { NavContextProps, withContext } from '../../context/NavContext';
import { FileType, getParentIdByPath, getPathFiles, getPathSet } from '../../types';
import { Add } from '../Add';
import { FileIcon } from '../FileIcon';

interface IProps extends NavContextProps {
  onAdd: (file: FileType) => void;
  onDelete: (id: string) => void;
}

class FileGridComp extends Component<IProps> {
  // 判断路径是否准确，不准确则跳转到根路径
  componentDidMount() {
    if (!getPathSet(this.props.fileMap).has(this.props.currentPath)) {
      this.props.onUpdatePath('/');
    }
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

  render() {
    const { currentPath, fileMap, onDelete } = this.props;

    const files = getPathFiles(currentPath, fileMap);

    return (
      <Container>
        {files.map((entry, i) => (
          <FileIcon
            entry={entry}
            index={i}
            key={`${entry.path}_${entry.isDir ? 'Folder' : 'File'}`}
            onDelete={() => {
              onDelete(entry.id);
            }}
          />
        ))}
        <Add
          onAdd={value => {
            this.props.onAdd({
              ...value,
              parentId: getParentIdByPath(currentPath, fileMap),
              parentPath: currentPath
            });
          }}
        />
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
