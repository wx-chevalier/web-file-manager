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

  onDelete: (id: string) => void;
}

interface FileIconListState {}

export class FileIconList extends React.Component<FileIconListProps, FileIconListState> {
  renderFileIcon = (dropProvided: DroppableProvided) => {
    const { files, onDelete } = this.props;
    return (
      <Container>
        <DropZone ref={dropProvided.innerRef}>
          {(files || []).map((entry, i) => (
            <Draggable key={i} draggableId={`fileIconList-drag-${i}`} index={i}>
              {(dragProvided, _dragSnapshot) => (
                <div
                  ref={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                >
                  <FileIcon
                    entry={entry}
                    index={i}
                    key={`${entry.path}_${entry.isDir ? 'Folder' : 'File'}`}
                    onDelete={() => {
                      onDelete(entry.id);
                    }}
                  />
                </div>
              )}
            </Draggable>
          ))}
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
  min-width: 600px;
  min-height: 60px;
`;

const Container = styled.div`
  flex-grow: 1;
  display: inline-flex;
`;
