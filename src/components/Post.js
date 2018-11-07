import React, {Component} from 'react';
import {Card} from 'semantic-ui-react';

class Post extends Component {

    constructor(props) {
        super(props);

        this.clickCard = this.clickCard.bind(this);
        this.likeClicked = this.likeClicked.bind(this);
    }

    //Function triggered when a card is clicked, and re-directs user to reddit post
    clickCard() {
        window.location.assign('https://www.reddit.com' + this.props.post.permalink);
    }

    //Calls onLike post-action when a post is liked/unliked
    likeClicked() {
        var liked = true;
        if (this.props.post.liked === true) {
            liked = false;
        }
        this.props.onLike(this.props.post.id, liked);
    }

    render() {
        return (
            //Populate Card with post info
            //Check the type of post and only set the image if it contains one
            <Card>
                {this.props.post.thumbnail === "self" || this.props.post.thumbnail === "default" || this.props.post.thumbnail === "nsfw" || this.props.post.thumbnail === "spoiler" ?
                    <div></div>
                    :
                    <div className="image">
                        <img src={this.props.post.thumbnail} alt="Missing thumbnail"/>
                    </div>
                }
                <Card.Content>
                    <Card.Header><a
                        href={'https://www.reddit.com' + this.props.post.permalink}>{this.props.post.title}</a></Card.Header>
                    <Card.Meta>{this.props.post.author}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                    <div style={{display: 'inline'}}>Score: {this.props.post.score}</div>
                    {this.props.post.liked === true ?
                        <button className='ui green button' style={{float: 'right'}}
                                onClick={this.likeClicked}>Unlike</button>
                        :
                        <button className='ui grey button' style={{float: 'right'}}
                                onClick={this.likeClicked}>Like</button>
                    }
                </Card.Content>
            </Card>
        );
    }
}

export default Post;
