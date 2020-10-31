import _ from 'lodash';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { StyleObject } from '../../types';

export interface ToggleSwitchProps {
  style?: StyleObject;
  checkedValue?: boolean;
  checkedChildren?: string | ReactNode;
  unCheckedChildren?: string | ReactNode;
  onChange?: (checked: boolean) => void;
}

export const ToggleSwitch = ({
  style,
  checkedValue,
  checkedChildren,
  unCheckedChildren,
  onChange
}: ToggleSwitchProps) => {
  const [isChecked, setChecked] = React.useState(false);
  return (
    <div>
      <CheckBoxWrapper style={style}>
        <CheckBox
          id="checkbox"
          type="checkbox"
          checked={_.isUndefined(checkedValue) ? isChecked : checkedValue}
          onChange={({ target: { checked } }) => {
            if (!_.isUndefined(checkedValue) && onChange) {
              onChange(checked);
              return;
            }
            setChecked(checked);
          }}
        />
        <CheckBoxLabel htmlFor="checkbox">
          {checkedChildren && unCheckedChildren && (
            <span>{checkedValue || isChecked ? checkedChildren : unCheckedChildren}</span>
          )}
        </CheckBoxLabel>
      </CheckBoxWrapper>
    </div>
  );
};

const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 26px;
  border-radius: 15px;
  background: #bebebe;
  cursor: pointer;
  & > span {
    color: #fff;
    font-size: 14px;
    line-height: 26px;
    margin: 0 5px 0 25px;
    transition: margin 0.2s;
  }
  &:before {
    position: absolute;
    left: 4px;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background: #fff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: left 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  width: 60px;
  height: 26px;
  border-radius: 15px;
  &:checked + ${CheckBoxLabel} {
    background: rgb(103, 182, 249);
    &:before {
      content: '';
      display: block;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      left: 37px;
      transition: left 0.2s;
    }
    & > span {
      color: #fff;
      font-size: 14px;
      margin: 0 25px 0 6px;
      transition: margin 0.2s;
    }
  }
`;
