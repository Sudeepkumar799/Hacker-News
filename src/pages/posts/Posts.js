import React from 'react';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {getStoriesData} from '../../redux/actions/stories';
import StoryCard from '../../components/story_card/StoryCard';

class PostsPre extends React.Component {
  componentDidMount() {
    this.props.getStoriesData();
  }

  handleNext = () => {
    this.props.getStoriesData('next');
  };

  handlePrev = () => {
    this.props.getStoriesData('prev');
  };

  render() {
    const {pageNumber, currentPageStoryData} = this.props;
    const buildStoryHml = currentPageStoryData.map((story, index) => {
      if (story.isVisible) {
        return <StoryCard data={story} points={story.points} index={index}
                          key={story.objectID}/>;
      }
    });

    return (
        <Container>
          <Row>
            {buildStoryHml}
          </Row>
          <Row>
            <Col xs={12} className="text-right">
              {
                pageNumber >= 1 ?
                    <Button
                        variant="primary"
                        onClick={this.handlePrev}
                    >Previous</Button> :
                    null
              }
              {
                pageNumber <= 49 ?
                    <Button
                        variant="primary"
                        onClick={this.handleNext}
                    >Next</Button> :
                    null
              }
            </Col>
          </Row>
          <br/>
        </Container>
    );
  }
}

const mapStateToProps = state => {
  return state.stories;
};

const Posts = connect(mapStateToProps, {getStoriesData})(PostsPre);

export default Posts;
