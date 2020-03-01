import React, { Component } from 'react';

import { SearchType } from '../../types';

import { FilterContainer, FilterContainerOptions } from './styles';

interface IProps {
  mode: SearchType;

  onModeChange: (mode: SearchType) => void;
}

export default class Filter extends Component<IProps> {
  render() {
    return (
      <FilterContainer>
        Search:
        <FilterContainerOptions>
          <span
            className={this.props.mode === 'LOCAL' ? 'selected' : ''}
            onClick={() => this.props.onModeChange('LOCAL')}
          >
            Local
          </span>
          <span
            className={this.props.mode === 'GLOBAL' ? 'selected' : ''}
            onClick={() => this.props.onModeChange('GLOBAL')}
          >
            Global
          </span>
        </FilterContainerOptions>
      </FilterContainer>
    );
  }
}
