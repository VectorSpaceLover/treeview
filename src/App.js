import React from "react";
import { PresidentProvider } from "./contexts/president";
import {TreeDataProvider} from "./contexts/treedata";
import {AuditorsProvider} from "./contexts/auditors";

import Routers from './router'

function App() {
  return (
    <>
      <AuditorsProvider>
        <PresidentProvider>
          <TreeDataProvider>
            <Routers/>
          </TreeDataProvider>
        </PresidentProvider>
      </AuditorsProvider>
      
    </>
  );
}

export default App;
