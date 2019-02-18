import styled from 'styled-components';

const CardStyle = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  font-family: ${props => props.theme.fontAlt};
  position: relative;
  &.offset {
    padding: 1rem;
    margin-top: 2rem;
  }
  &.with-margin {
    padding: 1rem;
  }
  .title {
    font-weight: 100;
    font-size: 1.8rem;
    letter-spacing: 2px;
    text-align: center;
  }
  .title-left {
    text-align: left;
    letter-spacing: 3px;
    padding: 0;
    border-bottom: dotted 1px ${props => props.theme.offWhite};
    margin: 0 0 0 1rem;
  }
  .sub-title {
    margin: 0 0 2rem;
    padding-bottom: 10px;
    font-weight: 100;
    text-align: center;
    letter-spacing: 3px;
    border-bottom: dotted 1px ${props => props.theme.offWhite};
  }
  ul {
    list-style: none;
    svg {
      margin-right: 1rem;
    }
  }
`;
export default CardStyle;
