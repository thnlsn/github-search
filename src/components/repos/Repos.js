import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const Repos = ({ repos, repoNum }) => {
    return repos
        .slice(0, repoNum)
        .map(repo => <RepoItem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
    repos: PropTypes.array.isRequired
};

export default Repos;
