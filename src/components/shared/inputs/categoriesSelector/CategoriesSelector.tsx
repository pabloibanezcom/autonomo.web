/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Category } from '@autonomo/common';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from 'material';
import { CancelIcon } from 'material/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCategories, selectCategories } from 'store';
import BaseElementProps from '../BaseElementProps';

interface CategoriesSelectorProps extends BaseElementProps {
  value: Category[];
  label?: string;
}

const CategoriesSelector = ({
  label = 'Categories',
  value,
  className,
  onChange
}: CategoriesSelectorProps) => {
  const dispatch = useDispatch();
  const categories: Category[] = useSelector(selectCategories);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    value || []
  );

  useEffect(() => {
    if (!categories) {
      dispatch(searchCategories({ filter: null }));
    }
  }, [categories, dispatch]);

  const toggleCategory = (category: Category) => {
    const newSelectedCategories = selectedCategories.find(
      (c) => c._id === category._id
    )
      ? selectedCategories.filter((c) => c._id !== category._id)
      : [...selectedCategories, category];

    setSelectedCategories(newSelectedCategories);
    onChange(newSelectedCategories);
  };

  return (
    <FormControl fullWidth className={className}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        label={label}
        value={selectedCategories}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selected.map((val: Category) => (
              <Chip
                key={val._id.toString()}
                label={val.name}
                clickable
                deleteIcon={
                  <CancelIcon onMouseDown={(e) => e.stopPropagation()} />
                }
                sx={{
                  backgroundColor: val.color,
                  color: '#ffffff'
                }}
                size="small"
                onClick={() => toggleCategory(val)}
                onDelete={() => toggleCategory(val)}
              />
            ))}
          </Box>
        )}
      >
        {categories &&
          categories.map((cat) => (
            // @ts-ignore
            <MenuItem
              key={cat.name}
              value={cat}
              onClick={() => toggleCategory(cat)}
            >
              {cat.name}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default CategoriesSelector;
