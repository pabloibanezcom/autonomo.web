import { Category } from '@autonomo/common';
import { Chip } from 'material';
import React from 'react';

type CategoriesLabelSetProps = {
  categories: Category[];
};

const CategoriesLabelSet = ({ categories }: CategoriesLabelSetProps) => {
  return (
    <div className="d-flex flex-column gap-1">
      {categories.map((c) => (
        <Chip
          key={c.name}
          label={c.name}
          size="small"
          sx={{ backgroundColor: c.color, color: c.altColor }}
        />
      ))}
    </div>
  );
};

export default CategoriesLabelSet;
