import React, { Component, Fragment } from 'react';

import { ModalProps, withModal } from '../../elements/withModal';
import { SvgIcon } from '../../elements/SvgIcon';
import { FileType, formatDate, getFileExt } from '../../types';

import { Details, Icon, Img, Logo } from './styles';

interface IProps extends ModalProps {
  entry: FileType;
}

class FileInfoComp extends Component<IProps> {
  render() {
    const { entry } = this.props;
    const ext = getFileExt(entry);

    return (
      <Fragment>
        <Icon>
          <Logo>
            <Img
              src={((<SvgIcon name={entry.isDir ? 'folder' : 'file'} />) as unknown) as string}
            />
            {!entry.isDir ? <span>{`.${ext}`}</span> : ''}
          </Logo>
        </Icon>

        <Details.Container>
          <Details.Info>
            <Details.Label>Name:</Details.Label>
            <Details.Value>{entry.name}</Details.Value>
          </Details.Info>
          <Details.Info>
            <Details.Label>Size:</Details.Label>
            <Details.Value>{entry.size}kb</Details.Value>
          </Details.Info>
          <Details.Info>
            <Details.Label>Creator Name:</Details.Label>
            <Details.Value>{entry.creatorName}</Details.Value>
          </Details.Info>
          <Details.Info>
            <Details.Label>Created Date:</Details.Label>
            <Details.Value>{formatDate(entry.createdAt)}</Details.Value>
          </Details.Info>
        </Details.Container>
      </Fragment>
    );
  }
}

export const FileInfo = withModal<IProps>(FileInfoComp)({
  style: {
    position: 'absolute',
    zIndex: 4000
  }
});
