import React from 'react';

const EmptyState = ({ icon: Icon, heading, message }) => {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
        {Icon ? (
          <Icon className="w-16 h-16 mx-auto" />
        ) : (
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
            />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{heading}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyState;
