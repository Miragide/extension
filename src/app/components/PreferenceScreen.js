import React, { Component, PropTypes } from 'react';
import { 
  DEACTIVATE_EVERYWHERE, 
  DEACTIVATE_WEBSITE_ALWAYS, 
  SESSION_DEACTIVATE_DELAY 
} from '../constants/preferences';
import { 
  PREFERENCE_SCREEN_PANEL_ABOUT,
  PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES
} from '../constants/ui';
import { Set as ImmutableSet } from 'immutable';


class PreferenceScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reactivatedWebsites: new ImmutableSet()
    };
  }

  render() {
    const { props, state } = this;
    const {
      preferenceScreenPanel, deactivatedWebsites, 
      onReactivateWebsite, openPrefScreen
    } = props;
    const { content, reactivatedWebsites } = state;

    let mainContent;

    const deactivatedWebsitesArray = [...deactivatedWebsites];

    const options = deactivatedWebsitesArray
        .map(s => <option value={s} key={s} />);


    const lis = deactivatedWebsitesArray
        .map(s => <li key={s}>
            <span>{s}</span>
            <button onClick={reactivatedWebsites.has(s) ?
                undefined :
                e => {
                  onReactivateWebsite(s);
                  this.setState(Object.assign({}, state, {
                    reactivatedWebsites: reactivatedWebsites.add(s)
                  }));
                }
            }>{
                reactivatedWebsites.has(s) ? '✓' : 'Réactiver'
            }</button>
        </li>);

    switch (preferenceScreenPanel){
      case PREFERENCE_SCREEN_PANEL_ABOUT:
        mainContent = 'Le Même En Mieux vous recommande des alternatives pertinentes, blablabla';
        break;
      case PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES:
        mainContent = (
                    <div>
                        <ul>
                            {lis}
                        </ul>
                    </div>
                );
        break;
      default:
        console.error('Unknown content value', content);
    }

    const changePanel = e => {
      const newContent = e.target.getAttribute('data-panel');
      openPrefScreen(newContent);
    };

    return (<section className="preference-panel wrapperframe">
            <nav>
                <button data-panel={PREFERENCE_SCREEN_PANEL_ABOUT} onClick={changePanel}>A propos</button>
                <button data-panel={PREFERENCE_SCREEN_PANEL_DEACTIVATED_WEBSITES} onClick={changePanel}>
                Sites désactivés
                </button>
            </nav>
            <main>
                {mainContent}
            </main>
        </section>);
  }

}

export default PreferenceScreen;
