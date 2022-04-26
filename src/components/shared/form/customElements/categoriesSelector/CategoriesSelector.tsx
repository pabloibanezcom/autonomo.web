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
import React, { useEffect } from 'react';
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
  onChange
}: CategoriesSelectorProps) => {
  const categories: Category[] = useSelector(selectCategories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!categories?.length) {
      dispatch(searchCategories({ filter: null }));
    }
  }, [categories, dispatch]);

  const handleChange = (evt: any) => {
    onChange(evt.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        label={label}
        value={value || []}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selected.map((val: Category) => (
              <Chip
                key={val._id.toString()}
                label={val.name}
                sx={{
                  backgroundColor: val.color,
                  color: '#ffffff'
                }}
                size="small"
              />
            ))}
          </Box>
        )}
      >
        {categories.map((cat) => (
          // @ts-ignore
          <MenuItem key={cat.name} value={cat}>
            {cat.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoriesSelector;
