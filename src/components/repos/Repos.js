import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const Repos = ({ repos, repoNum }) => {
    console.log(
        `▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓`
    );
    console.log(`TYPEOF REPONUM: ${typeof repoNum}`);
    console.log(`REPONUM BEFORE SLICE: ${repoNum}`);
    console.log(`REPOS BEFORE SLICE: ${repos}`);
    // let reposToMap = repos.slice(0, repoNum);
    console.log(`REPONUM AFTER SLICE: ${repoNum}`);
    // console.log(`REPOS AFTER SLICE: ${reposToMap}`);
    return repos
        .slice(0, repoNum)
        .map(repo => <RepoItem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
    repos: PropTypes.array.isRequired
};

export default Repos;
