import React, { useReducer, createContext } from 'react'
export const InterviewContext = createContext()

function reducer (prevState, action) {
  switch (action.type) {
    case 'SUBMIT_TIME':
      return {
        ...prevState,
        allocatedTime: action.time
      }
  }
}

export function InterviewProvider ({ children }) {
  const [interviewState, interviewDispatch] = useReducer(reducer, {
    allocatedTime: []
  })

  return (
    <InterviewContext.Provider value={[interviewState, interviewDispatch]}>
      {children}
    </InterviewContext.Provider>
  )
}
