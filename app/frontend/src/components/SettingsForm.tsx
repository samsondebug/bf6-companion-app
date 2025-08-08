import React, { useState } from 'react';

const SettingsForm: React.FC = () => {
  const [slowMo, setSlowMo] = useState(false);

  return (
    <form className="space-y-2">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={slowMo}
          onChange={e => setSlowMo(e.target.checked)}
        />
        <span>Enable Slow-Mo</span>
      </label>
      <button type="submit" className="px-2 py-1 bg-blue-600 rounded">
        Save
      </button>
    </form>
  );
};

export default SettingsForm;
