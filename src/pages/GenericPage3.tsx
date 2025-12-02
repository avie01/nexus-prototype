import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { PlusIcon, DocumentIcon, CalendarIcon, UsersIcon } from '../components/icons';

const GenericPage3 = () => {
  
  return (
    <main>
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Title 3</h1>
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

export default GenericPage3; 