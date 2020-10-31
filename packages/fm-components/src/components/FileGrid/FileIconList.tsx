import _ from 'lodash';
import * as React from 'react';
import { Draggable, Droppable, DroppableProvided } from 'react-beautiful-dnd';
import styled from 'styled-components';

import { FileType } from '../../types';
import { FileIcon } from '../FileIcon';

interface FileIconListProps {
  files: FileType[];
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
  extraEle?: JSX.Element;
  isMultiple?: boolean;

  onDelete: (id: string, isDir: boolean) => void;
}

interface FileIconListState {
  multipledEntryIds: { entryId: string; isDir: boolean }[];
}

export class FileIconList extends React.Component<FileIconListProps, FileIconListState> {
  constructor(props: FileIconListProps) {
    super(props);
    this.state = {
      multipledEntryIds: []
    };
  }

  onMultipleSelect = (entryId: string, isDir: boolean, isAdd: boolean) => {
    const { multipledEntryIds } = this.state;

    isAdd
      ? multipledEntryIds.push({ entryId, isDir })
      : _.remove(multipledEntryIds, s => s.entryId === entryId);

    this.setState({ multipledEntryIds });
  };

  renderFileIcon = (dropProvided: DroppableProvided) => {
    const { multipledEntryIds } = this.state;
    const { isMultiple, files, extraEle, onDelete } = this.props;

    return (
      <Container>
        <DropZone ref={dropProvided.innerRef}>
          {(files || []).map((entry, i) => (
            <Draggable key={entry.id} draggableId={`fileIconList-drag-${entry.id}`} index={i}>
              {(dragProvided, _dragSnapshot) => (
                <div
                  ref={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                >
                  <FileIcon
                    entry={entry}
                    index={i}
                    isMultiple={isMultiple}
                    multipledEntryIds={multipledEntryIds}
                    onMultipleSelect={this.onMultipleSelect}
                    key={`${entry.path}_${entry.isDir ? 'Folder' : 'File'}`}
                    onDelete={() => onDelete(entry.id, entry.isDir)}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {extraEle}
        </DropZone>
      </Container>
    );
  };

  public render() {
    const { listType, isCombineEnabled } = this.props;
    return (
      <Container>
        <Droppable
          direction="horizontal"
          droppableId="fileIconList"
          type={listType}
          isCombineEnabled={isCombineEnabled}
        >
          {(dropProvided, _dropSnapshot) => (
            <Wrapper {...dropProvided.droppableProps}>{this.renderFileIcon(dropProvided)}</Wrapper>
          )}
        </Droppable>
      </Container>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  user-select: none;
  transition: background-color 0.1s ease;
  margin: 8px 0;
`;

const DropZone = styled.div`
  display: flex;
  align-items: start;
  min-height: 60px;
  flex-wrap: wrap;
`;

const Container = styled.div`
  flex-grow: 0;
  display: inline-flex;
`;
