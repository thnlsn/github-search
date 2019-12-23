import React, { Component } from 'react';

// No state here, just a lifecycle method

export class User extends Component {
    // HOW DID match BECOME A PROP ???????????????????????????
    componentDidMount() {
        this.props.getUser(this.props.match.params.login) // This is found in 
    };

    render() {
        const {
            name,
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
        } = this.props.user;

        const { loading } = this.props;

        return (
            <div>
                {name}
            </div>
        )
    }
}

export default User
