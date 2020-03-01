import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import { Result, NoResult, Img, Path } from './styles';
import { withContext, NavContextProps } from '../../context/NavContext';
import { FileType } from '../../types';

interface IProps extends NavContextProps {
  closeResult: Function;
}

class SearchResultsComp extends Component<IProps> {
  onClick = (file: FileType) => {
    const path = !file.isDir ? file.parentPath : file.path;

    this.props.onUpdatePath(path);
    this.props.closeResult();
  };

  render() {
    const data = this.props.data.filter(arr => arr.name.match(this.props.term) !== null);
    return (
      <Fragment>
        {data.length > 0 ? (
          data.map(arr => (
            <Result key={arr.path} onClick={() => this.onClick(arr)}>
              <div>
                <Img src={arr.type == FILE ? FileIcon : FolderIcon} />
                {arr.name}
              </div>

              <Path>{arr.path}</Path>
            </Result>
          ))
        ) : (
          <NoResult>No Result</NoResult>
        )}
      </Fragment>
    );
  }
}

export const SearchResults = withContext<IProps>(SearchResultsComp);
