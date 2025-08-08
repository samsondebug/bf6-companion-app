import React, { useState } from 'react';
import QueueTable from './components/QueueTable';
import ClipCard from './components/ClipCard';
import SettingsForm from './components/SettingsForm';

const App: React.FC = () => {
  const [tab, setTab] = useState<'incoming' | 'processing' | 'ready' | 'settings' | 'review'>('incoming');

  return (
    <div className="p-4">
      <nav className="mb-4 space-x-2">
        {['incoming', 'processing', 'ready', 'review', 'settings'].map(t => (
          <button key={t} onClick={() => setTab(t as any)} className="px-2 py-1 bg-blue-600 rounded">
            {t}
          </button>
        ))}
      </nav>
      {tab === 'settings' ? (
        <SettingsForm />
      ) : tab === 'review' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ClipCard title="Pending Clip" status="review" />
        </div>
      ) : (
        <QueueTable status={tab} />
      )}
    </div>
  );
};

export default App;
