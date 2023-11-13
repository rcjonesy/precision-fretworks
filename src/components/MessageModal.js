import React from 'react';

export const MessageModal = ({ showModal, closeModal, sendMessage }) => {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <textarea
          className="w-64 h-40 p-2 ml-0 text-black border rounded"
          placeholder="Type your message here"
          onChange={sendMessage}
        />
        <button className="bg-red-700 hover:bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
          onClick={sendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
};

