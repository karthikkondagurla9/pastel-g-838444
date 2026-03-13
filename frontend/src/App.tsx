import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Customers } from './pages/Customers';
import { Support } from './pages/Support';
import { Automations } from './pages/Automations';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { Products, Settings } from './pages/Placeholders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="support" element={<Support />} />
          <Route path="automations" element={<Automations />} />
          <Route path="kb" element={<KnowledgeBase />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;