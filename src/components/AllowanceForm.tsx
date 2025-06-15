import React from 'react';
import { User, DollarSign } from 'lucide-react';

interface AllowanceFormProps {
  baseAllowance: number;
  childName: string;
  onBaseAllowanceChange: (amount: number) => void;
  onChildNameChange: (name: string) => void;
}

export const AllowanceForm: React.FC<AllowanceFormProps> = ({
  baseAllowance,
  childName,
  onBaseAllowanceChange,
  onChildNameChange
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <DollarSign className="text-green-500" />
        Allowance Setup
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-1" />
            Child's Name (Optional)
          </label>
          <input
            type="text"
            value={childName}
            onChange={(e) => onChildNameChange(e.target.value)}
            placeholder="Enter your name..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-1" />
            Base Allowance Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              value={baseAllowance || ''}
              onChange={(e) => onBaseAllowanceChange(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};