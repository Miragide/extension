import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import { ContentState } from 'app/content/store';
import { getContribution } from 'app/content/selectors';
import { close } from 'app/actions/ui';
import { submitContribution } from 'app/actions/contribution';

const mapDispatchToProps = {
  close,
  modify: goBack,
  publish: submitContribution
};

export default connect(
  (state: ContentState) => ({
    contribution: getContribution(state)
  }),
  mapDispatchToProps
);
