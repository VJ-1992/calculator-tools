
import React from 'react';

const App: React.FC = () => {
  /**
   * Return null to avoid rendering React UI on the static landing page.
   * This fixes the mount error while respecting the user's move to 
   * a multi-page static HTML architecture.
   */
  return null;
};

export default App;
