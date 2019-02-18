import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Email } from 'styled-icons/material';
import { Female, Male } from 'styled-icons/boxicons-regular';
import { BirthdayCake } from 'styled-icons/fa-solid';
import CardStyle from './styles/CardStyle';

const ProfileUI = styled.div`
  .left {
    width: 120px;
    display: inline-block;
    vertical-align: top;
    text-align: center;
    img {
      border: solid 1px ${props => props.theme.offWhite};
      padding: 5px;
    }
  }
  .right {
    display: inline-block;
    width: calc(100% - 120px);
    border-left: solid 1px ${props => props.theme.offWhite};
    h3 {
      font-family: ${props => props.theme.fontAlt} !important;
    }
  }
`;

const ProfileCard = ({ data }) => (
  <CardStyle className="offset">
    <ProfileUI>
      <div className="left">
        <img src={data.picture.data.url} alt={data.name} />
      </div>
      <div className="right">
        <h3 className="title title-left">{data.name}</h3>
        <ul>
          <li>
            <Email size={14} /> {data.email}
          </li>
          <li>
            {data.gender === 'male' ? <Male size={14} /> : <Female size={14} />}{' '}
            {data.gender}
          </li>
          <li>
            <BirthdayCake size={14} /> {data.birthday}
          </li>
        </ul>
      </div>
    </ProfileUI>
  </CardStyle>
);

export default ProfileCard;

ProfileCard.propTypes = {
  data: PropTypes.object.isRequired,
};
