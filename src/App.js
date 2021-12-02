import React from "react";
import { ParticipantProvider } from "./contexts/participant";
import {TreeDataProvider} from "./contexts/treedata";
import {AuditorsProvider} from "./contexts/auditors";

import Routers from './router'

function App() {
  return (
    <>
      <AuditorsProvider>
        <ParticipantProvider>
          <TreeDataProvider>
            <Routers/>
          </TreeDataProvider>
        </ParticipantProvider>
      </AuditorsProvider>
      
    </>
  );
}

export default App;
