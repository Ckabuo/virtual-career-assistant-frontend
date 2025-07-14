// pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import './dashboard.css';
import { responsesAPI } from '../services/api';
import ReactMarkdown from 'react-markdown';
import Loader from '../components/Loader/Loader';

export default function Dashboard() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchResponses() {
      try {
        setLoading(true);
        const response = await responsesAPI.getMyResponses();
        setResponses(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching responses:', err);
        setError('Failed to load responses');
      } finally {
        setLoading(false);
      }
    }
    fetchResponses();
  }, []);

  return (
    <div className="dashboard-container p-6">
      <h2 className="text-2xl font-bold mb-4">My Career Test Responses</h2>
      {loading ? (
        <Loader />
      ) : responses.length === 0 ? (
        <p>No responses found.</p>
      ) : (
        <div className="space-y-4">
          {responses.map((item, idx) => (
            <div key={item._id} className="response-card p-4 border rounded bg-white">
              <p className="text-gray-700 text-sm mb-2">Submitted on: {new Date(item.createdAt).toLocaleString()}</p>
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
