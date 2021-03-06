import { SagaIterator } from '@redux-saga/types';
import { ActionPattern, takeEvery, all, call } from '@redux-saga/core/effects';
import * as R from 'ramda';
import getSelectedTab from 'webext/getSelectedTab';
import postRating, { Rating } from 'api/postRating';
import {
  NOTICE_BADGED,
  NOTICE_DISPLAYED,
  OUTBOUND_LINK_CLICKED,
  NOTICE_UNFOLDED,
  FEEDBACK_ON_NOTICE,
  AppAction,
  FeedbackOnNoticeAction
} from 'app/actions';
import { RatingType } from 'app/lmem/rating';

export const isFeedBackRatingAction = (action: AppAction) =>
  action.type === FEEDBACK_ON_NOTICE &&
  (Object.values(RatingType) as string[]).includes(action.payload.feedback);

type RatingActionTransformer = (action: AppAction) => Rating;

const createDefaultTransformer = (
  ratingType: RatingType
): RatingActionTransformer => ({ payload: id }: AppAction) => ({
  noticeId: id as number,
  rating: ratingType
});

export const transformers: {
  pattern: ActionPattern;
  transformer: RatingActionTransformer;
}[] = [
  {
    pattern: isFeedBackRatingAction,
    // eslint-disable-next-line
    // @ts-ignore
    transformer: ({ payload: { id, feedback } }: FeedbackOnNoticeAction) => ({
      noticeId: id,
      rating: feedback
    })
  },
  {
    pattern: NOTICE_UNFOLDED,
    transformer: createDefaultTransformer(RatingType.UNFOLD)
  },
  {
    pattern: NOTICE_BADGED,
    transformer: createDefaultTransformer(RatingType.BADGED)
  },
  {
    pattern: OUTBOUND_LINK_CLICKED,
    transformer: createDefaultTransformer(RatingType.OUTBOUND_CLICK)
  },
  {
    pattern: NOTICE_DISPLAYED,
    transformer: createDefaultTransformer(RatingType.DISPLAY)
  }
];

export const createPostRatingSaga = (transformer: RatingActionTransformer) =>
  function* postRatingSaga(action: AppAction): SagaIterator {
    let rating = transformer(action);
    if (!rating.url) {
      const selectedTab = yield call(getSelectedTab);
      rating = R.assoc('url', selectedTab.url, rating);
    }

    try {
      yield call(postRating, rating);
    } catch (e) {
      // That’s just one like missing …
      // … and we don’t retry because we don’t want to count twice
    }
  };

export default function* ratingsRootSaga() {
  yield all(
    transformers.map(({ pattern, transformer }) =>
      takeEvery(pattern, createPostRatingSaga(transformer))
    )
  );
}
