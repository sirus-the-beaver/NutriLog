import React from 'react';
import { PurchaseProvider } from './src/services/PurchaseContext';
import PurchaseScreen from './src/components/PurchaseScreen';

const App = () => (
  <PurchaseProvider>
    <PurchaseScreen />
  </PurchaseProvider>
);

export default App;
