import styled from 'styled-components';

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  .Toastify {
    font-size: 1rem;
    button {
      padding: 0px 3px !important;
    }
    .Toastify__toast-body {
      font-weight: 300 !important;
      color: ${props => props.theme.black};
    }
  }
`;

export default Columns;
