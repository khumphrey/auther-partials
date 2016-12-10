import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const INITIALIZE = 'INITIALIZE_STORIES'
const CREATE     = 'CREATE_STORY'
const REMOVE     = 'REMOVE_STORY'
const UPDATE     = 'UPDATE_STORY'


/* ------------   ACTION CREATORS     ------------------ */

const init   = stories => ({ type: INITIALIZE, stories })
const create = story   => ({ type: CREATE, story })
const remove = id      => ({ type: REMOVE, id })
const update = story   => ({ type: UPDATE, story })


/* ------------       REDUCER     ------------------ */

export default function reducer (stories = [], action) {
  switch (action.type) {
    
    case INITIALIZE: 
      return action.stories

    case CREATE:
      return [action.story, ...stories]

    case REMOVE:
      return stories
        .filter(story => story.id !== action.id)
    
    case UPDATE:
      return stories
        .map(story => (
          action.story.id === story.id ? action.story : story
        ))

    default: 
      return stories;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const fetchStories = () => dispatch => {
    axios.get('/api/stories')
         .then(res => dispatch(init(res.data)))
         .catch(err => console.error('Fetching stories unsuccesful', err))
}

// optimistic
export const removeStory = id => dispatch => { 
    dispatch(remove(id))
    axios.delete(`/api/stories/${id}`)
         .catch(err => console.error(`Removing story: ${id} unsuccesful`, err))
}

export const addStory = story => dispatch => {
    axios.post('/api/stories', story)
         .then(res => dispatch(create(res.data)))
         .catch(err => console.error(`Creating story: ${story} unsuccesful`, err))
}

export const updateStory = (id, story) => dispatch => {
    axios.put(`/api/stories/${id}`, story)
         .then(res => dispatch(update(res.data)))
         .catch(err => console.error(`Updating story: ${story} unsuccesful`, err))
}