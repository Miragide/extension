import { LocationChangeAction } from 'connected-react-router';
import { BrowserActionClickedAction } from './browser';
import {
  TabCreatedAction,
  TabRemovedAction,
  TabUpdatedAction
} from './tabsLifecycle';
import { InstalledAction } from './install';
import {
  RefreshMatchingContextsAction,
  ReceivedMatchingContextsAction
} from './kraftBackend';
import {
  InitAction,
  MatchContextAction,
  MatchContextFailureAction,
  NoticeIgnoredAction,
  NoticeDisplayedAction,
  ContextTriggeredAction,
  ContextTriggerFailureAction
} from './tabs';
import { InstalledDetailsAction } from './filters';
import { CloseAction, ClosedAction, OpenAction, OpenedAction } from './ui';
import { FeedbackOnNoticeAction, NoticesFoundAction } from './recommendations';
import { Action } from 'redux';

export interface BaseAction extends Action {
  payload?: {};
  meta?: ActionMeta;
}

export type TabAction = BaseAction & {
  meta: ActionMeta & {
    tab: number;
  };
};

export interface ActionMeta {
  tab?: number;
  sendToBackground?: boolean;
  sendToTab?: boolean;
}

export type AppAction =
  | InitAction
  | BrowserActionClickedAction
  | TabCreatedAction
  | TabUpdatedAction
  | TabRemovedAction
  | InstalledAction
  | RefreshMatchingContextsAction
  | ReceivedMatchingContextsAction
  | MatchContextAction
  | MatchContextFailureAction
  | ContextTriggeredAction
  | ContextTriggerFailureAction
  | NoticeDisplayedAction
  | NoticeIgnoredAction
  | InstalledDetailsAction
  | OpenAction
  | OpenedAction
  | CloseAction
  | ClosedAction
  | NoticesFoundAction
  | FeedbackOnNoticeAction
  | (LocationChangeAction & { meta?: ActionMeta });