import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LocationDescriptor } from 'history';
import Avatar from 'components/molecules/Avatar/Avatar';

interface ContentProps {
  to?: LocationDescriptor;
  children: ReactNode;
  isRead: boolean;
}
const Content = ({ to, isRead, ...props }: ContentProps) => {
  if (to) {
    return <Link to={to} {...props} />;
  }

  return <div {...props} />;
};

export default styled(Content)`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 338px;
  min-height: 85px;
  padding: 12px 12px 12px 13px;
  margin-right: 11px;
  margin-left: 5px;
  text-decoration: none;
  background-color: ${props => (props.isRead ? 'transparent' : '#fff')};
  border-radius: 15px;
  border: 2px solid ${props => (props.isRead ? '#fff' : 'transparent')};

  &,
  p {
    transition: all 0.2s ease-in-out;
  }

  ${Avatar} {
    align-self: flex-start;
    margin-right: 10px;
  }

  &[href]:hover {
    border-color: ${props => props.theme.activeColor};

    p {
      color: ${props => props.theme.activeColor};
    }
  }

  & > p + div {
    width: 100%;
  }

  & [class^='OpenButton'] {
    height: auto;
  }

  &:hover > div:nth-child(3) {
    stroke: ${props => props.theme.activeColor};
  }
`;
