import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ContributorId } from 'app/lmem/contributor';
import { subscribe, unsubscribe } from 'app/actions/subscription';
import {
  getContributorFromRouteParam,
  getFeaturedNotice,
  getContributorNoticesButFeaturedOne,
  getSimilarContributors,
  getStatefulContributors
} from 'app/profiles/store/selectors';
import { areNoticesLoading } from 'app/profiles/store/selectors/notices';
import { areContributorsLoading } from 'app/profiles/store/selectors/contributors';
import { isConnected } from 'app/profiles/store/selectors/connection';
import { ProfilesState } from 'app/profiles/store/reducers';
import { ProfileProps } from './Profile';
import { extensionMessageSender } from 'app/profiles/extensionId';

export type ConnectedProfileScreenProps = ProfileProps &
  RouteComponentProps<{ id: string }>;

const mapStateToProps = (
  state: ProfilesState,
  props: ConnectedProfileScreenProps
) => ({
  loading: areContributorsLoading(state),
  contributor: getContributorFromRouteParam(state, props),
  similarContributors: getSimilarContributors(state, props).slice(0, 6),
  contributors: getStatefulContributors(state),
  contributorsLoading: areContributorsLoading(state),
  featuredNotice: getFeaturedNotice(state, props),
  noticesLoading: areNoticesLoading(state),
  notices: getContributorNoticesButFeaturedOne(state, props),
  connected: isConnected(state),
  addToBrowser: clickInstallHandler
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const receiver = extensionMessageSender;

  return {
    subscribe: (contributorId: ContributorId) =>
      dispatch(subscribe(contributorId, { receiver })),
    unsubscribe: (contributorId: ContributorId) =>
      dispatch(unsubscribe(contributorId, { receiver }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps);
