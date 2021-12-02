import React, { useState } from 'react';

const ParticipantContext = React.createContext([{}, () => {}]);

const ParticipantProvider = (props) => {
  const [participant, setParticipant] = useState([]);
  return (
    <ParticipantContext.Provider value={[participant, setParticipant]}>
      {props.children}
    </ParticipantContext.Provider>
  );
};

export {ParticipantContext, ParticipantProvider};