import React from 'react';
import styled from 'styled-components';

const SpinnerStyle = styled.div`
  text-align: center;
  min-height: ${props => (props.inline ? '3rem' : '60vh')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = props => (
  <SpinnerStyle {...props}>
    <img src="/assets/images/spinner.svg" alt="loading" />
  </SpinnerStyle>
);
export default Spinner;
