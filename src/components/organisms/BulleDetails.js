import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  BulleDetailsContainer,
  BulleDetailsContent,
  BulleDetailsMeta,
  BulleDeleted,
  Approves,
  Contributor,
  DeleteButton,
  OpenButton,
  Dislikes,
  Message,
  Source,
  SourceURL,
  Feedbacks,
  Date,
  Truncated
} from '../atoms';
import { Anchor } from '../atoms/icons';
import { BulleTitle, BulleType } from '../molecules';

export default class Bulle extends PureComponent {
  static propTypes = {
    details: PropTypes.bool,
    type: PropTypes.string,
    date: PropTypes.string,
    message: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    approves: PropTypes.number,
    dislikes: PropTypes.number,
    contributor: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    deleted: PropTypes.bool,
  }

  static defaultProps = {
    details: false,
    type: null,
    date: null,
    approves: 0,
    dislikes: 0,
    onDelete: () => { },
    deleted: false,
  }

  render() {
    const {
      type, details, date, message, contributor, source, approves, dislikes, onDelete, deleted
    } = this.props;
    return (
      <BulleDetailsContainer>
        {deleted ? (
          <Fragment>
            <BulleDetailsContent>
              <BulleDeleted>Cette bulle ne s’affichera plus !</BulleDeleted>
            </BulleDetailsContent>
          </Fragment>
        ) : (
          <Fragment>
            {!details && <DeleteButton onClick={onDelete} />}
            <BulleDetailsContent deleted={deleted}>
              <BulleDetailsMeta>
                <BulleType type={type} />
                <div>
                  <Date>
                    Le 
                    &nbsp;
                    {date}
                  </Date>
                  <Contributor>
                    {contributor}
                    &nbsp;
                    a écrit
                  </Contributor>
                </div>
              </BulleDetailsMeta>
              {details ? (
                <Fragment>
                  <Message>{message}</Message>
                  <Source>
                    <Anchor />
                    En savoir plus : 
                    &nbsp;
                    <SourceURL>
                      <Truncated width="230px">
                        {source}
                      </Truncated>
                    </SourceURL>
                  </Source>

                  <Feedbacks>
                    <Approves>{approves}</Approves>
                    <Dislikes>{dislikes}</Dislikes>
                  </Feedbacks>
                </Fragment>
              ) : (
                <Fragment>
                  <div>
                    <BulleTitle>{message}</BulleTitle>
                    <Contributor>
                      Par :
                      &nbsp;
                      {contributor}
                    </Contributor>
                  </div>
                  <OpenButton to="/details" />
                </Fragment>
              )}
            </BulleDetailsContent>
          </Fragment>
        )}
      </BulleDetailsContainer>
    );
  }
}