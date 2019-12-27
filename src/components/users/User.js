import React, { Fragment, useState, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom'; // for the back button to go back to searches and not empty
import GithubContext from '../../context/github/githubContext';

// No state here, just a lifecycle method
const User = ({ match }) => {
    const githubContext = useContext(GithubContext);

    const { getUser, loading, user, repos, getUserRepos } = githubContext;

    const [repoNum, setRepoNum] = useState('5');

    // HOW DID match BECOME A PROP ???????????????????????????
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []); // COME BACK TO THIS... IT IS WIERD.
    // useEffect() runs on ANY update, so it runs on a loop. The [] mimics componentDidMount() because that is where you would but cases for useEffect() to run, but empty [] means just once when it mounts.

    const {
        name,
        company,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user;

    if (loading) return <Spinner />;

    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back to Search
            </Link>
            Hireable:{' '}
            {hireable ? (
                <i className='fas fa-check text-success' />
            ) : (
                <i className='fas fa-times-circle text-danger' />
            )}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img
                        src={avatar_url}
                        className='round-img'
                        alt=''
                        style={{ width: '150px' }}
                    />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                        <Fragment>
                            <h3>Bio</h3>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>
                        Visit GitHub Profile
                    </a>
                    <ul>
                        <li>
                            {login && (
                                <Fragment>
                                    <strong>Username: </strong> {login}
                                </Fragment>
                            )}
                        </li>

                        <li>
                            {company && (
                                <Fragment>
                                    <strong>Company: </strong> {company}
                                </Fragment>
                            )}
                        </li>

                        <li>
                            {blog && (
                                <Fragment>
                                    <strong>Website: </strong> {blog}
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
                <div className='card text-center'>
                    <div className='badge badge-primary'>
                        Followers: {followers}
                    </div>
                    <div className='badge badge-success'>
                        Following: {following}
                    </div>
                    <div className='badge badge-light'>
                        Public Repos: {public_repos}
                    </div>
                    <div className='badge badge-dark'>
                        Public Gists: {public_gists}
                    </div>
                </div>
            </div>
            <select>
                <option value='five'>5</option>
                <option value='ten'>10</option>
                <option value='twenty-five'>25</option>
                <option value='fifty'>50</option>
                <option value='one-hundred'>100</option>
            </select>
            <Repos repos={repos} />
        </Fragment>
    );
};

export default User;
