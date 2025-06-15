import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content - Almost full screen */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full h-full max-w-[95vw] max-h-[95vh] overflow-y-auto animate-in zoom-in-95 duration-300 flex flex-col">
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-8 h-8 text-gray-500" />
            </button>
          </div>
        )}
        
        {/* Content - Takes up remaining space */}
        <div className="flex-1 p-8 overflow-y-auto">
          {children}
        </div>
        
        {/* Close button at bottom */}
        <div className="flex justify-center p-6 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={onClose}
            className="px-8 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors font-medium text-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};