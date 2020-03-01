import React, { useState } from 'react';

import { CollapseContainer } from './styles';

export function Collapse(props: { children: Function; index: number }) {
  const [visible, setVisible] = useState(false);

  return (
    <CollapseContainer>{props.children(visible, () => setVisible(!visible))}</CollapseContainer>
  );
}
