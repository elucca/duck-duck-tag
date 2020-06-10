
const emptyJob = {
    sessionJobID: 0,
    services: [],
    result: []
}

const job = (state = emptyJob, action) => {

  console.log('reducing to ', action.data)
  switch (action.type) {
    case 'SET_JOB':
      return action.data
  }
  return state
}

export default job
