import React, { useState } from 'react';

const AuditorsContext = React.createContext([{}, () => {}]);
// const techCompanies = [
//   { label: "Apple", value: 1 },
//   { label: "Facebook", value: 2 },
//   { label: "Netflix", value: 3 },
//   { label: "Tesla", value: 4 },
//   { label: "Amazon", value: 5 },
//   { label: "Alphabet", value: 6 },
// ];
const AuditorsProvider = (props) => {
  const [auditors, setAuditors] = useState([]);
  return (
    <AuditorsContext.Provider value={[auditors, setAuditors]}>
      {props.children}
    </AuditorsContext.Provider>
  );
};

export {AuditorsContext, AuditorsProvider};