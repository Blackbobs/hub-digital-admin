'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ChevronDown, Send, Paperclip, X } from 'lucide-react';

const EmailComposeForm = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      recipients: [],
      subject: '',
      body: ''
    }
  });

  // Sample recipients data
  const availableRecipients = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah.wilson@example.com' },
    { id: 5, name: 'David Brown', email: 'david.brown@example.com' },
  ];

  const selectedRecipients = watch('recipients') as Recipient[];

  interface Recipient {
    id: number;
    name: string;
    email: string;
  }

  interface EmailFormValues {
    recipients: Recipient[];
    subject: string;
    body: string;
  }

  const onSubmit = (data: EmailFormValues) => {
    console.log('Email data:', data);
    // alert('Email sent successfully!');
  };

  const toggleRecipient = (
    recipient: Recipient,
    field: { onChange: (value: Recipient[]) => void }
  ) => {
    const isSelected = selectedRecipients.some(r => r.id === recipient.id);
    if (isSelected) {
      field.onChange(selectedRecipients.filter(r => r.id !== recipient.id));
    } else {
      field.onChange([...selectedRecipients, recipient]);
    }
  };

  const removeRecipient = (recipientId: number, field: { onChange: (value: Recipient[]) => void }) => {
    field.onChange(selectedRecipients.filter(r => r.id !== recipientId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Compose Email</h1>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Recipients */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Recipients
              </label>
              <Controller
                name="recipients"
                control={control}
                rules={{ required: 'Please select at least one recipient' }}
                render={({ field }) => (
                  <div className="relative">
                    {/* Selected Recipients Display */}
                    <div className="min-h-[48px] border border-gray-300 rounded-lg p-3 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {selectedRecipients.map((recipient) => (
                          <div
                            key={recipient.id}
                            className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                          >
                            <span className="truncate max-w-[200px]">
                              {recipient.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeRecipient(recipient.id, field)}
                              className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Dropdown Trigger */}
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center justify-between w-full text-left text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <span className="text-sm">
                          {selectedRecipients.length === 0 ? 'Select recipients...' : 'Add more recipients...'}
                        </span>
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                        {availableRecipients.map((recipient) => {
                          const isSelected = selectedRecipients.some(r => r.id === recipient.id);
                          return (
                            <button
                              key={recipient.id}
                              type="button"
                              onClick={() => toggleRecipient(recipient, field)}
                              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                isSelected ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                              }`}
                            >
                              <div className="font-medium">{recipient.name}</div>
                              <div className="text-sm text-gray-500">{recipient.email}</div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              />
              {errors.recipients && (
                <p className="text-red-500 text-sm mt-1">{errors.recipients.message}</p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <Controller
                name="subject"
                control={control}
                rules={{ required: 'Subject is required' }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                )}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Email Body */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Body
              </label>
              <Controller
                name="body"
                control={control}
                rules={{ required: 'Email body is required' }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={12}
                    placeholder="Write your email here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  />
                )}
              />
              {errors.body && (
                <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
              >
                <Send size={18} />
                Send Email
              </button>
              
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
              >
                <Paperclip size={18} />
                Attach Files
              </button>
              
              {/* <button
                type="button"
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Save Draft
              </button> */}
            </div>
          </div>
        </div>

        {/* Debug Info (remove in production) */}
        {/* <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-700 mb-2">Form State (Debug):</h3>
          <pre className="text-xs text-gray-600 overflow-x-auto">
            {JSON.stringify(watch(), null, 2)}
          </pre>
        </div> */}
      </div>
    </div>
  );
};

export default EmailComposeForm;