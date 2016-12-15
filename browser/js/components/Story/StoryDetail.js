import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import ContentEditable from 'react-contenteditable';
import { updateStory } from '../../redux/stories';

/* -----------------    COMPONENT     ------------------ */

class StoryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author_id: '',
      paragraphs: [],
    };
    this.onStoryUpdate = this.onStoryUpdate.bind(this);
    this.renderRawHTML = this.renderRawHTML.bind(this);
  }

  render() {
    const {users, story} = this.props;
    // const story = this.props.story;
    console.log('story', story)
    if (!story) return <div></div>; // the story id is invalid or the data isnt loaded yet
    return (
      <div className="container story-container">
        <ul className="list-inline large-font">
          <li>
            <input
              className="form-like large-font"
              value={story.title}
              onChange={evt => this.onStoryUpdate({ title: evt.target.value })}
            />
          </li>
          <li><span className="muted">by</span></li>
          <li>
            <select
              value={story.author_id}
              onChange={evt => this.onStoryUpdate({ author_id: evt.target.value })}>
            {
              users.map((user, index) => (
                <option key={index} value={user.id}>{user.name}</option>
              ))
            }
            </select>
          </li>
        </ul>
        <br />
        <ContentEditable
           placeholder="(text here)"
           html={this.renderRawHTML()}
           onChange={evt => this.onStoryUpdate({ paragraphs: evt.target.value })}>
        </ContentEditable>
      </div>
    );
  }

  renderRawHTML() {
    const { story } = this.props;
    const { paragraphs } = this.state;

    let storyHTML = '';

    if (paragraphs.length) {
      storyHTML = paragraphs.join('<br><br>');
    }
    else if (story && story.paragraphs && story.paragraphs.length) {
      storyHTML = story.paragraphs.join('<br><br>');
    }

    return storyHTML;
  }

  onStoryUpdate(storyUpdateObj) {
    const {story, updateStory} = this.props;
    // this is probably pretty fragile
    if (storyUpdateObj.paragraphs) {
      storyUpdateObj.paragraphs = storyUpdateObj.paragraphs.split('<br><br>');
    }
    updateStory(story.id, storyUpdateObj);
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users, currentStory }, ownProps) => {
  const story = currentStory;
  console.log('mapping state', story)
  return { story, users };
};

const mapDispatch = { updateStory };

export default connect(mapState, mapDispatch)(StoryDetail);
