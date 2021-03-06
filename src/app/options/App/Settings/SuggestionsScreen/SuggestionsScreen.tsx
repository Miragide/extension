import React, { useEffect, useState } from 'react';
import * as R from 'ramda';
import {
  findContributorIn,
  sortContributorsByContributions,
  StatefulContributor
} from 'app/lmem/contributor';
import ContributorLarge from 'components/organisms/Contributor/ContributorLarge';
import ContributorsList from 'components/organisms/Contributor/ContributorsList';
import ContributorsListEmpty from 'app/options/App/Settings/ContributorsListEmpty';

export interface SuggestionsScreenProps {
  suggestions: StatefulContributor[];
  allContributors: StatefulContributor[];
  subscribe: (contributor: StatefulContributor) => () => void;
  unsubscribe: (contributor: StatefulContributor) => () => void;
  showExampleLink?: boolean;
  highlightExampleLink?: boolean;
  preselectedContributorsIds?: number[] | null;
}

const addPreselectedContributors = (
  allContributors: StatefulContributor[],
  preselectedContributorsIds: number[]
) =>
  R.concat(
    preselectedContributorsIds.map((id: number) =>
      R.find(R.propEq('id', id), allContributors)
    ) as StatefulContributor[]
  );

const SuggestionsScreen = ({
  allContributors,
  suggestions,
  subscribe,
  unsubscribe,
  preselectedContributorsIds
}: SuggestionsScreenProps) => {
  const [initialSuggestions, setInitialSuggestions] = useState(suggestions);

  useEffect(() => {
    if (initialSuggestions.length === 0) setInitialSuggestions(suggestions);
  }, [suggestions]);

  if (allContributors.length === 0) {
    return (
      <ContributorsListEmpty>
        L&apos;extension essaie de retrouver la liste de contributeurs.
        <br /> Si le problème persiste, veuillez désactiver et réactiver votre
        extension, ou la désinstaller et la réinstaller.
      </ContributorsListEmpty>
    );
  }

  const suggestionsToRender = R.pipe(
    R.map(findContributorIn(allContributors)),
    preselectedContributorsIds
      ? addPreselectedContributors(allContributors, preselectedContributorsIds)
      : R.identity,
    R.uniqBy(R.prop('id')),
    sortContributorsByContributions
  )(initialSuggestions);

  return (
    <>
      {suggestionsToRender.length > 0 ? (
        <ContributorsList>
          {suggestionsToRender.map(contributor => (
            <ContributorLarge
              key={contributor.id}
              contributor={contributor}
              onSubscribe={subscribe(contributor)}
              onUnsubscribe={unsubscribe(contributor)}
            />
          ))}
        </ContributorsList>
      ) : (
        <ContributorsListEmpty>
          Pas de suggestions pour le moment.
        </ContributorsListEmpty>
      )}
    </>
  );
};

export default SuggestionsScreen;
