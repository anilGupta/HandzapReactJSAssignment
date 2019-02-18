import styled from 'styled-components';

const ListHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px  ${props => props.theme.darkgrey};
  letter-spacing: 4px;
  margin-bottom: 1rem;
  h3{
     font-family:  ${props => props.theme.fontAlt};
      margin: 0;
      padding: 0;
      line-height: 2rem;
  }
  .actions{
     display: flex;
       a{
        padding: 0.5rem 2rem;
        display: flex;
        align-items: center;
        position: relative;
        text-transform: uppercase;
        font-size: 1rem;
        background: none;
        border: 0;
        cursor: pointer;
        color: ${props => props.theme.darkgrey};
        font-weight: 100;
        font-family:  ${props => props.theme.fontAlt};;
        letter-spacing: 2px;
        text-decoration: none;
        &:before {
          content: '';
          width: 2px;
          background: ${props => props.theme.lightgrey};
          height: 100%;
          left: 0;
          position: absolute;
          transform: skew(-20deg);
          top: 0;
          bottom: 0;
        }
        &:after {
          height: 2px;
          background: ${props => props.theme.red};
          content: '';
          width: 0;
          position: absolute;
          transform: translateX(-50%);
          transition: width 0.4s;
          transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
          left: 50%;
          margin-top: 1.2rem;
      }
    }
  }
  
  @media (max-width: 767px) {
      h3{
        font-size: 1rem;
        line-height: 42px;
      }
      .actions{
          a{
           font-size: 10px;
           padding: 0.6rem;
       }
  }
`;

export default ListHeaderStyle;
