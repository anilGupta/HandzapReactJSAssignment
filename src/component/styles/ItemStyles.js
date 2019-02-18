import styled from 'styled-components';

const ItemStyles = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  position: relative;
  display: flex;
  flex-direction: column;
  opacity: 0.7;
  min-height: 320px;
  cursor: pointer;
  &:hover {
    opacity: 1;
    box-shadow: ${props => props.theme.bs};
    z-index: 1;
    background: rgba(178, 44, 92, 0.3);
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  .grid-item-info {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    h3 {
      color: ${props => props.theme.offWhite};
      font-size: 18px;
      font-weight: lighter;
      font-family: ${props => props.theme.fontAlt};
      padding: 0 1rem;
      text-transform: uppercase;
      letter-spacing: 1.4px;
    }
    p {
      line-height: 1.4;
      font-weight: 300;
      flex-grow: 1;
      padding: 0 1rem;
      font-size: 1rem;
      margin: 0 0 1rem;
    }
  }
`;

export default ItemStyles;
