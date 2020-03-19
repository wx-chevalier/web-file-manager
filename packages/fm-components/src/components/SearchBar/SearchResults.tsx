import React, { Component, Fragment } from 'react';

import { NavContextProps, withContext } from '../../context/NavContext';
import { SvgIcon } from '../../elements/SvgIcon';
import { FileType, StyleObject, classPrefix } from '../../types';

import { NoResult, Path, Result } from './styles';

interface IProps extends NavContextProps {
  data: FileType[];
  term: string;
  style: StyleObject;

  onResultClose: Function;
}

class SearchResultsComp extends Component<IProps> {
  onClick = (file: FileType) => {
    const dirId = !file.isDir ? file.parentId : file.id;

    this.props.onUpdateCurrentDir(dirId);
    this.props.onResultClose();
  };

  render() {
    const { style } = this.props;

    const data = this.props.data.filter(arr => arr.name.match(this.props.term) !== null);

    return (
      <Fragment>
        {data.length > 0 ? (
          data.map(file => (
            <Result
              className={`${classPrefix}-searchBar-searchResults`}
              key={file.path}
              style={style}
              onClick={() => this.onClick(file)}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SvgIcon name={file.isDir ? 'folder' : 'file'} size={50} />
                <span style={{ marginLeft: 8 }}>{file.name}</span>
              </div>
              <Path className={`${classPrefix}-SearchResults-result-path`}>{file.path}</Path>
            </Result>
          ))
        ) : (
          <NoResult style={style}>No Result</NoResult>
        )}
      </Fragment>
    );
  }
}

export const SearchResults = withContext<IProps>(SearchResultsComp);
