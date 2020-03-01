import React, { Component, createRef } from 'react';

import { NavContextProps, withContext } from '../../context/NavContext';
import { FileType, SearchType, getPathFiles } from '../../types';

import { Container, Input, Line } from './styles';
import Filter from './Filter';
import MagnifyIcon from './MagnifyIcon';
import { SearchResults } from './SearchResults';

interface IProps extends NavContextProps {}

interface IState {
  term: string;
  width: string;
  mode: SearchType;
  data?: FileType[];
}

class SearchBarComp extends Component<IProps, IState> {
  _ref = createRef<HTMLDivElement>();
  state: IState = {
    term: '',
    width: '0',
    mode: 'LOCAL',
    data: null
  };

  componentDidMount() {
    this.setState(() => {
      const { width } = getComputedStyle(this._ref.current);
      return {
        width
      };
    });
  }

  onModeChange = (mode: SearchType) => {
    this.setState({
      mode
    });
  };

  render() {
    const { fileMap, currentPath } = this.props;

    return (
      <Input placeholder="Search for anything" ref={this._ref}>
        <MagnifyIcon
          fill="#545B61"
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            left: 9,
            marginTop: 9
          }}
          size={15}
        />
        <input
          placeholder="Search for Anything"
          value={this.state.term}
          onChange={event => this.setState({ term: event.target.value })}
        />
        {this.state.term.length > 0 ? (
          <Container style={{ width: this.state.width }}>
            <Filter mode={this.state.mode} onModeChange={this.onModeChange} />
            <Line />
            <SearchResults
              style={{ width: this.state.width }}
              term={this.state.term}
              data={
                this.state.mode === 'LOCAL'
                  ? getPathFiles(currentPath, fileMap)
                  : Object.keys(fileMap).map(id => fileMap[id])
              }
              onResultClose={() => this.setState({ term: '' })}
            />
          </Container>
        ) : (
          ''
        )}
      </Input>
    );
  }
}

export const SearchBar = withContext(SearchBarComp);
