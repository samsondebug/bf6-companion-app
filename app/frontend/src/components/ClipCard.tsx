import React from 'react';

interface Props {
  title: string;
  status: string;
}

const ClipCard: React.FC<Props> = ({ title, status }) => (
  <div className="border p-3 rounded bg-gray-800">
    <h3 className="font-bold">{title}</h3>
    <p>{status}</p>
    <button className="mt-2 px-2 py-1 bg-green-600 rounded">Approve</button>
  </div>
);

export default ClipCard;
