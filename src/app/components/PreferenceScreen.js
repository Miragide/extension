import React, { Component, PropTypes } from 'react';

import { 
  PREFERENCE_SCREEN_PANEL_ABOUT,
  PREFERENCE_SCREEN_PANEL_CRITERIA,
  PREFERENCE_SCREEN_PANEL_SOURCES,
} from '../constants/ui';

import PreferenceAboutPanel from './PreferenceAboutPanel';
import PreferenceCriteriaPanel from './PreferenceCriteriaPanel';
import PreferenceSourcesPanel from './PreferenceSourcesPanel';

function mainClassName(screenPanel) {
  switch (screenPanel) {
    case PREFERENCE_SCREEN_PANEL_ABOUT:
      return 'preference-about';
    case PREFERENCE_SCREEN_PANEL_CRITERIA:
      return 'preference-criteria';
    case PREFERENCE_SCREEN_PANEL_SOURCES:
      return 'preference-sources';
    default:
      return '';
  }
}

export default function (props) {
  const {
    preferenceScreenPanel, openPrefScreen,
    imagesUrl, onInstalledDetails, 
    criteria, selectCriterion, unselectCriterion,
    editors, excludeEditor, includeEditor
  } = props;

  let mainContent;

  switch (preferenceScreenPanel){
    case PREFERENCE_SCREEN_PANEL_ABOUT:
      mainContent = (<PreferenceAboutPanel
        onInstalledDetails={onInstalledDetails}
      />);
      break;
    case PREFERENCE_SCREEN_PANEL_CRITERIA:
      mainContent = (<PreferenceCriteriaPanel
        criteria={criteria}
        selectCriterion={selectCriterion}
        unselectCriterion={unselectCriterion}
        imagesUrl={imagesUrl}
      />);
      break;
    case PREFERENCE_SCREEN_PANEL_SOURCES:
      mainContent = (<PreferenceSourcesPanel
        editors={editors}
        excludeEditor={excludeEditor}
        includeEditor={includeEditor}
        imagesUrl={imagesUrl}
      />);
      break;
    default:
      console.error('Unknown content value', preferenceScreenPanel);
  }

  const changePanel = e => {
    const newContent = e.currentTarget.getAttribute('data-panel');
    openPrefScreen(newContent);
  };

  return (<section className="preference-panel">
    <nav>
      <ul>
        <li className="preference-menu-about">
          <button
            data-panel={PREFERENCE_SCREEN_PANEL_ABOUT}
            onClick={changePanel}
            className={'not-button with-image' +
              (preferenceScreenPanel === PREFERENCE_SCREEN_PANEL_ABOUT ? ' active' : '')}>
            <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'info.svg'} />
            <span>À propos</span>
          </button>
        </li>
        <li className="preference-menu-criteria">
          <button
            data-panel={PREFERENCE_SCREEN_PANEL_CRITERIA}
            onClick={changePanel}
            className={'not-button with-image' +
            (preferenceScreenPanel === PREFERENCE_SCREEN_PANEL_CRITERIA ? ' active' : '')}>
            <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'valid.svg'} />
            <span>Critères de choix</span>
          </button>
        </li>
        <li className="preference-menu-sources">
          <button
            data-panel={PREFERENCE_SCREEN_PANEL_SOURCES}
            onClick={changePanel}
            className={'not-button with-image' +
            (preferenceScreenPanel === PREFERENCE_SCREEN_PANEL_SOURCES ? ' active' : '')}>
            <img role="presentation" className="lmem-controls-picto" src={imagesUrl + 'close.svg'} />
            <span>Sources d’information</span>
          </button>
        </li>
      </ul>
    </nav>
    <div className="separation-bar"></div>
    <main className={mainClassName(preferenceScreenPanel)}>
      {mainContent}
    </main>
  </section>);
  
}
