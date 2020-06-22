import React from 'react';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {getStoriesData} from '../../redux/actions/stories';
import {StoryCard} from '../../components/story_card/StoryCard';

class PostsPre extends React.Component {
  componentDidMount() {
    this.props.getStoriesData();
  }

  render() {
    const {storyData} = this.props;
    const buildStoryHml = storyData.map(story => <StoryCard data={story} key={story.objectID}/>);

    return (
        <Container>
          <Row>
            {buildStoryHml}
          </Row>
        </Container>
    );
  }
}

const mapStateToProps = state => {
  return state.stories;
};

const Posts = connect(mapStateToProps, {getStoriesData})(PostsPre);

export default Posts;
