import React from 'react';
import { connect } from'react-redux';
import _ from 'lodash';
import ContentEditable from "react-contenteditable";
import { updateStory } from '../../redux/stories';

/* -----------------    COMPONENT     ------------------ */

class StoryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      author_id: '', 
      paragraphs: [],
    }
    this.onStoryUpdate = this.onStoryUpdate.bind(this);
    this.renderRawHTML = this.renderRawHTML.bind(this);
  }

  render() {
    const {users, story} = this.props;
    if (!story) return <div></div> // the story id is invalid or the data isnt loaded yet
    return (
      <div className="container story-container">
        <ul className="list-inline large-font">
          <li>
            <input 
              className="form-like large-font"
              defaultValue={story.title}
              onChange={e => this.onStoryUpdate({ title: e.target.value })}
            />
          </li>
          <li><span className="muted">by</span></li>
          <li>
            <select 
              defaultValue={story.author_id} 
              onChange={e => this.onStoryUpdate({ author_id: e.target.value })}>
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
           onChange={e => this.onStoryUpdate({ paragraphs: e.target.value })}>
        </ContentEditable>
      </div>
    );
  }

  renderRawHTML() {
    const { story } = this.props;
    const { paragraphs } = this.state;
    
    let storyHTML = "";

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
      storyUpdateObj.paragraphs = storyUpdateObj.paragraphs.split('<br><br>')
    }
    this.setState(storyUpdateObj);
    updateStory(story.id, storyUpdateObj)
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ stories, users }, ownProps) => {
  const id = Number(ownProps.params.id);
  const story = _.find(stories, story => story.id === id);
  
  return { story, users }
}

const mapDispatch = { updateStory }

export default connect(mapState, mapDispatch)(StoryDetail);
