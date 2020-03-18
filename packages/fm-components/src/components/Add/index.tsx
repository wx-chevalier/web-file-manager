import React, { Fragment, memo, useState } from 'react';
import styled from 'styled-components';

import { FileType } from '../../types';
import { FileCreator } from '../FileCreator';

interface IProps {
  onAdd: (file: FileType) => void;
}

export function AddComp(props: IProps) {
  const [open, handleOpen] = useState(false);
  return (
    <Fragment>
      <Container onClick={() => handleOpen(true)}>+</Container>
      {open ? (
        <FileCreator
          title="上传模型/新建目录"
          onAdd={(value: FileType) => props.onAdd(value)}
          onClose={() => handleOpen(false)}
        />
      ) : (
        ''
      )}
    </Fragment>
  );
}

export const Add = memo(AddComp);

const Container = styled.div`
  height: 109px;
  width: 96px;
  border: 3px dashed #dee0e4;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  align-items: center;
  font-size: 30px;
  color: #dee0e4;
  margin: 0 16px;
  cursor: copy;
`;
