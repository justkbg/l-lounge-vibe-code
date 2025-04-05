
import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface FilterButtonsProps {
  categories: Category[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  categories, 
  activeFilter, 
  onFilterChange 
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in staggered-fade">
      {categories.map((category, index) => (
        <button
          key={category.id}
          onClick={() => onFilterChange(category.id)}
          className={`px-4 py-2 rounded-full transition-all duration-300 ${
            activeFilter === category.id 
              ? 'bg-primary text-primary-foreground neo-glow' 
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
          style={{ animationDelay: `${0.1 * (index + 3)}s` }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
