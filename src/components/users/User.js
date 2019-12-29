import React, { Fragment, useState, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import { Link } from 'react-router-dom'; // for the back button to go back to searches and not empty
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
    const githubContext = useContext(GithubContext);

    const { getUser, loading, user, repos, getUserRepos } = githubContext;

    const [repoNum, setRepoNum] = useState(10);

    // HOW DID match BECOME A PROP ???????????????????????????
    useEffect(() => {
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    }, []); // COME BACK TO THIS... IT IS WIERD.
    // useEffect() runs on ANY update, so it runs on a loop. The [] mimics componentDidMount() because that is where you would but cases for useEffect() to run, but empty [] means just once when it mounts. d

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
                <i class='fas fa-step-backward'></i> Back to Search
            </Link>
            Hireable:{' '}
            {hireable ? (
                <i className='fas fa-check text-success' />
            ) : (
                <i className='fas fa-times-circle text-primary' />
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
                                    <strong>Website: </strong>{' '}
                                    <a
                                        className='link'
                                        href={'https://' + blog}
                                    >
                                        {blog}
                                    </a>
                                </Fragment>
                            )}
                        </li>
                    </ul>
                </div>
                <div className='card text-center grid-2'>
                    <div className='badge badge-good'>
                        Followers: {followers}
                    </div>
                    <div className='badge badge-success'>
                        Following: {following}
                    </div>
                    <div className='badge badge-dark'>
                        Public Gists: {public_gists}
                    </div>
                    <div className='badge badge-light'>
                        Public Repos: {public_repos}
                    </div>
                </div>
            </div>
            <div className='card'>
                <label htmlFor='map'>
                    View past
                    <select
                        className='form-control'
                        value={repoNum}
                        onChange={event => {
                            setRepoNum(parseInt(event.target.value, 10));
                        }}
                    >
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='25'>25</option>
                        <option value='50'>50</option>
                        <option value='100'>100</option>
                    </select>
                    repositories...
                </label>

                <Repos repos={repos} repoNum={repoNum} />
            </div>
        </Fragment>
    );
};

export default User;
