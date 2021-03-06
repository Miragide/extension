import {
  getIgnoringReason,
  IgnoringReason,
  Notice,
  StatefulNotice
} from 'app/lmem/notice';
import Tab from 'app/lmem/tab';
import { ActionMeta, BaseAction, ErrorAction, TabAction } from '.';
import { createErrorAction } from './helpers';

export const FETCH_NOTICES_REQUEST = 'NOTICES/FETCH_REQUEST';
export interface FetchNoticesRequestAction extends BaseAction {
  type: typeof FETCH_NOTICES_REQUEST;
  payload: object;
}
export const fetchNoticesRequest = (
  data: object = {}
): FetchNoticesRequestAction => ({
  type: FETCH_NOTICES_REQUEST,
  payload: data
});

export const NOTICES_FETCHED = 'NOTICES/FETCHED';
export interface NoticesFetchedAction extends BaseAction {
  type: typeof NOTICES_FETCHED;
  payload: Notice[];
}

export const noticesFetched = (notices: Notice[]): NoticesFetchedAction => ({
  type: NOTICES_FETCHED,
  payload: notices
});

export const FETCH_NOTICES_FAILURE = 'NOTICES/FETCH_FAILURE';
export interface FetchNoticeFailureAction extends ErrorAction {
  type: typeof FETCH_NOTICES_FAILURE;
}
export const fetchNoticesFailure = createErrorAction(FETCH_NOTICES_FAILURE);

export const NOTICE_DISPLAYED = 'NOTICE_DISPLAYED';
export interface NoticeDisplayedAction extends BaseAction {
  type: typeof NOTICE_DISPLAYED;
  payload: number;
}
export const noticeDisplayed = (id: number): NoticeDisplayedAction => ({
  type: NOTICE_DISPLAYED,
  payload: id,
  meta: { sendToBackground: true }
});

export const NOTICE_IGNORED = 'NOTICE_IGNORED';
export interface NoticeIgnoredAction extends BaseAction {
  type: typeof NOTICE_IGNORED;
  payload: { notice: Notice; reason: IgnoringReason; url: string };
}
export const noticeIgnored = (
  notice: StatefulNotice,
  url: string
): NoticeIgnoredAction => ({
  type: NOTICE_IGNORED,
  payload: { notice, reason: getIgnoringReason(notice), url }
});

export const NOTICES_FOUND = 'NOTICES_FOUND';
export interface NoticesFoundAction extends TabAction {
  type: typeof NOTICES_FOUND;
  payload: {
    notices: StatefulNotice[];
  };
}

export const noticesFound = (
  notices: StatefulNotice[],
  tab: Tab
): NoticesFoundAction => ({
  type: NOTICES_FOUND,
  payload: {
    notices
  },
  meta: {
    tab,
    sendToTab: true
  }
});

// Context was triggered but they were no notices left to display
export const NO_NOTICES_DISPLAYED = 'NO_NOTICES_DISPLAYED';
export interface NoNoticesDisplayedAction extends TabAction {
  type: typeof NO_NOTICES_DISPLAYED;
}

export const noNoticesDisplayed = (tab: Tab): NoNoticesDisplayedAction => ({
  type: NO_NOTICES_DISPLAYED,
  meta: {
    tab,
    sendToTab: true
  }
});

export type FeedbackType =
  | 'dismiss'
  | 'confirmDismiss'
  | 'undismiss'
  | 'like'
  | 'unlike'
  | 'dislike'
  | 'confirmDislike'
  | 'undislike';

export const FEEDBACK_ON_NOTICE = 'FEEDBACK_ON_NOTICE';
export interface FeedbackOnNoticeAction extends BaseAction {
  type: typeof FEEDBACK_ON_NOTICE;
  payload: { id: number; feedback: FeedbackType };
}

export const createFeedbackOnNoticeAction = (
  id: number,
  feedback: FeedbackType
): FeedbackOnNoticeAction => ({
  type: FEEDBACK_ON_NOTICE,
  payload: { id, feedback },
  meta: { sendToBackground: true }
});

export const dismissNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'dismiss');

export const confirmDismissNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'confirmDismiss');

export const undismissNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'undismiss');

export const likeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'like');

export const unlikeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'unlike');

export const dislikeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'dislike');

export const confirmDislikeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'confirmDislike');

export const undislikeNotice = (id: number) =>
  createFeedbackOnNoticeAction(id, 'undislike');

export const NOTICE_UNFOLDED = 'NOTICE/UNFOLDED';
export interface UnfoldNoticeAction extends BaseAction {
  type: typeof NOTICE_UNFOLDED;
  payload: number;
}

export const unfoldNotice = (id: number): UnfoldNoticeAction => ({
  type: NOTICE_UNFOLDED,
  payload: id,
  meta: { sendToBackground: true }
});

export const MARK_NOTICE_READ = 'MARK_NOTICE_READ';
export interface MarkNoticeReadAction extends BaseAction {
  type: typeof MARK_NOTICE_READ;
  payload: number;
}

export const markNoticeRead = (
  id: number,
  meta?: ActionMeta
): MarkNoticeReadAction => ({
  type: MARK_NOTICE_READ,
  payload: id,
  meta
});

export const NOTICE_BADGED = 'NOTICE/BADGED';
export interface NoticeBadgedAction extends BaseAction {
  type: typeof NOTICE_BADGED;
  payload: number;
  meta: { tab?: Tab };
}

export const noticeBadged = (id: number, tab?: Tab): NoticeBadgedAction => ({
  type: NOTICE_BADGED,
  payload: id,
  meta: { tab }
});

export const OUTBOUND_LINK_CLICKED = 'NOTICE/OUTBOUND_LINK_CLICKED';
export interface OutboundLinkClickedAction extends BaseAction {
  type: typeof OUTBOUND_LINK_CLICKED;
  payload: number;
  meta: ActionMeta & { url?: string };
}

export const outboundLinkClicked = (
  id: number,
  url?: string
): OutboundLinkClickedAction => ({
  type: OUTBOUND_LINK_CLICKED,
  payload: id,
  meta: { sendToBackground: true, url }
});
