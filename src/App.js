import React, {Component} from 'react';
import Post from './components/Post';
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux';
import {fetchPosts, likePost} from './actions/posts-actions';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            allSelected: true,
        };
        this.onFetchPosts = this.onFetchPosts.bind(this);
        this.onLike = this.onLike.bind(this);
        this.filterLiked = this.filterLiked.bind(this);
        this.filterAll = this.filterAll.bind(this);
    }

    componentDidMount() {
        this.onFetchPosts();
    }

    //fetch post data from reddit api and then update store
    onFetchPosts() {
        fetch('https://www.reddit.com/r/surfing/hot/.json')
            .then(results => results.json())
            .then(json => {
                this.props.onFetchPosts(json.data.children);
                this.setState({
                    isLoaded: true,
                })
            });
    }

    onLike(id, liked) {
        this.props.onLikePost(id, liked);
    }

    filterLiked() {
        if (this.state.allSelected) {
            this.setState({allSelected: false});
        }
    }

    filterAll() {
        if (!this.state.allSelected) {
            this.setState({allSelected: true});
        }
    }

    render() {

        const {isLoaded, allSelected} = this.state;

        //check the state of the all/liked filter and filter/map posts accordingly
        var posts = [];
        if (allSelected) {
            posts = this.props.posts.map((post) => {
                return <Post onLike={this.onLike} key={post.data.id} post={post.data}/>;
            });
        } else {
            posts = this.props.posts.filter(post => post.data.liked).map(post => <Post onLike={this.onLike}
                                                                                       key={post.data.id}
                                                                                       post={post.data}/>)
        }

        //styles
        let cardStyle = {display: 'flex', justifyContent: 'center', paddingRight: '1em', paddingLeft: '1em'};
        let headerStyle = {display: 'flex', justifyContent: 'center', paddingTop: '2em', paddingBottom: '1em'};

        if (!isLoaded) {
            return <div style={headerStyle}>Loading...</div>
        } else {
            return (
                <div>
                    <div>
                        <div style={headerStyle}>
                            <h1 className="ui header">Hot posts from r/surfing</h1>
                        </div>
                        <div style={headerStyle}>
                            <Button active={this.state.allSelected} onClick={this.filterAll}
                                    attached='left'>All</Button>
                            <Button active={!this.state.allSelected} onClick={this.filterLiked}
                                    attached='right'>Liked</Button>
                        </div>
                    </div>
                    <div>
                        {posts.length === 0 ?
                            <div style={headerStyle}>You haven't liked any posts!</div>
                            :
                            <div className="ui link cards" style={cardStyle}>
                                {posts}
                            </div>
                        }
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
};

const mapActionsToProps = {
    onFetchPosts: fetchPosts,
    onLikePost: likePost
};

export default connect(mapStateToProps, mapActionsToProps)(App);