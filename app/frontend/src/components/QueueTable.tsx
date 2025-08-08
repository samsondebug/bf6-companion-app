import React from 'react';

interface Props {
  status: string;
}

const QueueTable: React.FC<Props> = ({ status }) => {
  return (
    <table className="min-w-full bg-gray-800">
      <thead>
        <tr>
          <th className="px-2 py-1 text-left">Clip</th>
          <th className="px-2 py-1 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-2 py-1">sample.mp4</td>
          <td className="px-2 py-1">{status}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default QueueTable;
