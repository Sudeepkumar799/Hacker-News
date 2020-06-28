import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {changeLoading, getStoriesData} from '../../redux/actions/stories';
import StoryCard from '../../components/story_card/StoryCard';
import ReactLoading from 'react-loading';

const PostsPre = (props) => {
  const {loading, pageNumber, changeLoading, getStoriesData, currentPageStoryData} = props;

  useEffect(() => {
    changeLoading();
    getStoriesData();
    console.log('Working');
  }, []);

  const handleNext = () => {
    changeLoading();
    getStoriesData('next');
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    changeLoading();
    getStoriesData('prev');
    window.scrollTo(0, 0);
  };

  if (loading) return <>
    <ReactLoading
        type={'spin'}
        color={'red'}
        height={40}
        width={40}
        className="post-detailed-circle"
    />
    <p className="text-center">Loading...</p>
  </>;

  const buildStoryHml = currentPageStoryData.map((story, index) => {
    if (story.title !== null && story.title !== '' && story.isVisible) {
      return <StoryCard
          data={story}
          points={story.points}
          index={index}
          key={story.objectID}
      />;
    } else return null;
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
                      onClick={handlePrev}
                  >Previous</Button> :
                  null
            }
            {
              pageNumber <= 49 ?
                  <Button
                      variant="primary"
                      onClick={handleNext}
                  >Next</Button> :
                  null
            }
          </Col>
        </Row>
        <br/>
      </Container>
  );

};

// class PostsPre extends React.Component {
//   componentDidMount() {
//     const {changeLoading, getStoriesData} = this.props;
//     changeLoading();
//     getStoriesData();
//   }
//
//   handleNext = () => {
//     const {changeLoading, getStoriesData} = this.props;
//     changeLoading();
//     getStoriesData('next');
//     window.scrollTo(0, 0);
//   };
//
//   handlePrev = () => {
//     const {changeLoading, getStoriesData} = this.props;
//     changeLoading();
//     getStoriesData('prev');
//     window.scrollTo(0, 0);
//   };
//
//   render() {
//     const {loading, pageNumber, currentPageStoryData} = this.props;
//
//     if (loading) return <>
//       <ReactLoading
//           type={'spin'}
//           color={'red'}
//           height={40}
//           width={40}
//           className="post-detailed-circle"
//       />
//       <p className="text-center">Loading...</p>
//     </>;
//
//     const buildStoryHml = currentPageStoryData.map((story, index) => {
//       if (story.title !== null && story.isVisible) {
//         return <StoryCard
//             data={story}
//             points={story.points}
//             index={index}
//             key={story.objectID}
//         />;
//       } else return null;
//     });
//
//     return (
//         <Container>
//           <Row>
//             {buildStoryHml}
//           </Row>
//           <Row>
//             <Col xs={12} className="text-right">
//               {
//                 pageNumber >= 1 ?
//                     <Button
//                         variant="primary"
//                         onClick={this.handlePrev}
//                     >Previous</Button> :
//                     null
//               }
//               {
//                 pageNumber <= 49 ?
//                     <Button
//                         variant="primary"
//                         onClick={this.handleNext}
//                     >Next</Button> :
//                     null
//               }
//             </Col>
//           </Row>
//           <br/>
//         </Container>
//     );
//   }
// }

const mapStateToProps = state => {
  return state.stories;
};

const Posts = connect(mapStateToProps, {changeLoading, getStoriesData})(
    PostsPre);

export default Posts;
