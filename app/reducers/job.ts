
const emptyJob = {
    sessionJobID: 0,
    services: [],
    result: []
}

const job = (state = emptyJob, action) => {

  switch (action.type) {
    case 'SET_JOB':
      return action.data
  }
  return state
}

export default job
