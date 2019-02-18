import styled from 'styled-components';

const ThemeButton = styled.button`
  background: ${props => props.theme.red};
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 1.4rem;
  padding: 0.4rem 1rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
  &.altColor {
    background: ${props => props.theme.lightBlue};
  }
  &.btn-light {
    padding: 6px 12px;
    color: ${props => props.theme.white};
    background: rgba(34, 34, 34, 0.9);
    border: 2px solid transparent;
    font-size: 11px;
    font-weight: 400;
    text-decoration: none;
    letter-spacing: 2px;
  }
  &.with-margin {
    margin-top: 1rem;
  }
  &.btn-full {
    width: 100%;
  }
`;

export default ThemeButton;
