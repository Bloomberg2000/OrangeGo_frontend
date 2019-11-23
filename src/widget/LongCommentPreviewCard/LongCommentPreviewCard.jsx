import React from "react";
import './LongCommentPreviewCard.css'
import {Avatar, Button, Card, Col, Icon, Rate, Row, Tooltip, Typography} from "antd";
import * as PropTypes from "prop-types";

const {Text, Paragraph} = Typography;

export default class LongCommentPreviewCard extends React.Component {
    static propTypes = {
        // 基本跳转信息
        authorId: PropTypes.number,
        movieId: PropTypes.number,
        commentId: PropTypes.number,
        // 基本信息
        authorName: PropTypes.string,
        movieName: PropTypes.string,
        movieScore: PropTypes.number,
        editTime: PropTypes.string,
        commentTitle: PropTypes.string,
        commentContent: PropTypes.string,

        // 选填
        withAuthorPicShow: PropTypes.bool,
        authorPic: PropTypes.string,
        withMoviePicShow: PropTypes.bool,
        moviePic: PropTypes.string,
        withLikeOrDisLike: PropTypes.bool,
        likeNumber: PropTypes.number,
        dislikeNumber: PropTypes.number,
        replyNumber: PropTypes.number,
    }


    constructor(props, context) {
        super(props, context);
        this.state = {
            likes: props.likeNumber,
            dislikes: props.dislikeNumber,
            reply: props.replyNumber,
            action: null
        }
    }

    like = () => {
        this.setState({
            likes: this.props.likeNumber + 1,
            dislikes: this.props.dislikeNumber,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: this.props.likeNumber,
            dislikes: this.props.dislikeNumber + 1,
            action: 'disliked',
        });
    };

    render() {
        const {likes, dislikes, action} = this.state;
        return (
            <div className={"LongCommentPreviewCard"} style={{width: '100%'}}>
                <Card bordered={false} style={{width: "100%"}}>
                    <Row type="flex" justify="space-between">
                        <Col xs={this.props.withMoviePicShow ? 19 : 24}
                             md={this.props.withMoviePicShow ? 21 : 24}
                            xl={this.props.withMoviePicShow ? 22 : 24}>
                            {this.props.withAuthorPicShow ?
                                <Row type="flex" justify="start" align="middle">
                                    <Avatar src={this.props.authorPic}/>
                                    <Button type="link">{this.props.authorName}</Button>
                                    <Rate disabled allowHalf defaultValue={Math.round(this.props.movieScore) / 2}/>
                                    <Text type="secondary" style={{marginLeft: '10px'}}>{this.props.editTime}</Text>
                                </Row>
                                : null}
                            <Row>
                                <Button size={"large"} type="link"
                                        style={{
                                            padding: 0,
                                            margin: (this.props.withAuthorPicShow) ? '10px 0 10px 0' : '0',
                                            fontWeight: 'bold'
                                        }}>
                                    {this.props.commentTitle}
                                </Button>
                            </Row>
                            {!this.props.withAuthorPicShow ?
                                <Row type="flex" justify="start" align="middle" style={{padding: '10px 0'}}>
                                    <a>{this.props.authorName}</a>
                                    <Text type="secondary" style={{margin: '0 10px'}}>评论</Text>
                                    <a>{this.props.movieName}</a>
                                    <Rate disabled allowHalf style={{marginLeft: '10px'}}
                                          defaultValue={Math.round(this.props.movieScore) / 2}/>
                                </Row>
                                : null}
                            <Row>
                                <Paragraph ellipsis={{rows: 3, expandable: true}}>
                                    {this.props.commentContent}
                                </Paragraph>
                            </Row>
                            {this.props.withLikeOrDisLike ?
                                <Row>
                        <span key="comment-basic-like">
                            <Tooltip title="有用">
                              <Icon
                                  type="like"
                                  theme={action === 'liked' ? 'filled' : 'outlined'}
                                  onClick={this.like}
                              />
                            </Tooltip>
                            <span style={{paddingLeft: 8, cursor: 'auto'}}>{likes}</span>
                          </span>
                                    <span key='comment-basic-dislike' style={{paddingLeft: '10px'}}>
                            <Tooltip title="没用">
                              <Icon
                                  type="dislike"
                                  theme={action === 'disliked' ? 'filled' : 'outlined'}
                                  onClick={this.dislike}
                              />
                            </Tooltip>
                            <span style={{paddingLeft: 6, cursor: 'auto'}}>{dislikes}</span>
                          </span>
                                    <span key="comment-basic-reply-to" style={{paddingLeft: '10px'}}>
                            <Button type="link">回应 {this.props.replyNumber}</Button>
                        </span>
                                </Row> : null}
                        </Col>
                        {this.props.withMoviePicShow ?
                            <Col xs={5} md={3} xl={2}>
                                <div className="movie-pic" style={{
                                    backgroundImage: 'url(' + this.props.moviePic + ')',
                                    backgroundPosition: 'top right',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain'
                                }}/>

                            </Col> : null}
                    </Row>
                </Card>
            </div>
        );

    }
}
