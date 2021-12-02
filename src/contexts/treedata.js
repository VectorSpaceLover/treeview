import React, { useState } from 'react';

const TreeDataContext = React.createContext([{}, () => {}]);

const TreeDataProvider = (props) => {
  const [treeData, setTreeData] = useState([]);
  return (
    <TreeDataContext.Provider value={[treeData, setTreeData]}>
      {props.children}
    </TreeDataContext.Provider>
  );
};

export {TreeDataContext, TreeDataProvider};