import React, { useEffect, useState } from 'react';
import './admin.css';
import { responsesAPI } from '../services/api';
import ReactMarkdown from 'react-markdown';

export default function AdminView() {
  const [allResponses, setAllResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
  async function fetchAll() {
    try {
      const response = await responsesAPI.getAllResponses();
      setAllResponses(response.data);
      setError('');
    } catch (err) {
      setError('Unauthorized or failed to fetch data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  fetchAll();
}, []);

  return (
    <div className="admin-container p-6">
      <h2 className="text-2xl font-bold mb-4">All Career Assistant Responses</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : allResponses.length === 0 ? (
        <p>No responses found.</p>
      ) : (
        <div className="space-y-4">
          {allResponses.map((item, idx) => (
            <div key={item._id} className="admin-response p-4 border rounded bg-white">
              <p className="text-gray-500 text-sm mb-1">
                Submitted: {new Date(item.createdAt).toLocaleString()}
              </p>
              <p className="userid text-sm text-gray-600 mb-2">
                <strong>User ID:</strong> {item.userId}
              </p>
              <h4 className="font-semibold">Response #{idx + 1}</h4>
              <div className="mt-2 markdown-content">
                <ReactMarkdown
                  components={{
                    p: ({node, ...props}) => <p style={{whiteSpace: 'pre-wrap'}} {...props} />
                  }}
                >
                  {item.response}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
