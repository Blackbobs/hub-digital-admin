import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 bg-opacity-10">
      <div className="bg-white absolute rounded-l-md shadow-lg w-full max-w-2xl ml-auto h-full p-6 relative overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
