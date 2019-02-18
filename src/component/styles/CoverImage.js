import styled from 'styled-components';

const CoverImage = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("${props => props.src}");
  background-size: cover;
  z-index: -1;
`;

export default CoverImage;
