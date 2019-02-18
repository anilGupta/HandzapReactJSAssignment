import styled from 'styled-components';

const AlbumGridStyle = styled.div`
  .album-grid-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px));
    grid-column-gap: 20px;
    .album-thumb {
      position: relative;
      margin: 10px 10px;
      border: 1px solid ${props => props.theme.offWhite};
      box-shadow: ${props => props.theme.bs};
      width: calc(33.33% - 20px);
      img {
        max-width: 100%;
        height: auto;
      }
    }
  }
`;

export default AlbumGridStyle;
