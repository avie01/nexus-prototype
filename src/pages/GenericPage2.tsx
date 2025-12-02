import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PlusIcon, CalendarIcon, UsersIcon } from '../components/icons';

const GenericPage2 = () => {
    
  return (
    <main>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Title 2</h1>
            <p className="text-gray-600 mt-2">Subtitle</p>
          </div>
          <Button className="flex items-center gap-2">
            <PlusIcon size={16} />
            Button
          </Button>
        </div>
      </div>

    </main>
  );
};

export default GenericPage2; 