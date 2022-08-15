import { SearchRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { City, ListParams } from 'models';
import { ChangeEvent, useRef } from 'react';

export interface StudentFiltersProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
  filter,
  cityList,
  onChange,
  onSearchChange,
}: StudentFiltersProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_like: e.target.value,
      _page: 1,
    };

    onSearchChange(newFilter);
  };

  const handleCityChange = (e: SelectChangeEvent) => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      city: e.target.value || undefined,
      _page: 1,
    };
    onChange(newFilter);
  };
  const handleSortChange = (e: SelectChangeEvent) => {
    if (!onChange) return;
    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined,
    };
    onChange(newFilter);
  };
  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined,
    };
    onChange(newFilter);

    if (searchRef.current) {
      searchRef.current.value = '';
    }
  };
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth size='small'>
            <InputLabel htmlFor='searchByName'>Search By Name</InputLabel>
            <OutlinedInput
              id='searchByName'
              endAdornment={<SearchRounded />}
              label='Search By Name'
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth size='small'>
            <InputLabel id='searchByCity'>Search By City</InputLabel>
            <Select
              labelId='searchByCity'
              value={filter.city || ''}
              onChange={handleCityChange}
              autoWidth
              label='Search By City'
            >
              <MenuItem value=''>
                <em>All</em>
              </MenuItem>
              {cityList.map((city) => (
                <MenuItem key={city.code} value={city.code}>{city.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl fullWidth size='small'>
            <InputLabel id='searchBySort'>Search By Sort</InputLabel>
            <Select
              labelId='searchBySort'
              value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
              onChange={handleSortChange}
              autoWidth
              label='Search By Sort'
            >
              <MenuItem value=''>
                <em>No Sort</em>
              </MenuItem>
              <MenuItem value='name.asc'>Name ASC</MenuItem>
              <MenuItem value='name.desc'>Name DESC</MenuItem>
              <MenuItem value='mark.asc'>Mark ASC</MenuItem>
              <MenuItem value='mark.desc'>Mark DESC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={2}>
          <Button fullWidth variant='contained' onClick={handleClearFilter}>
            Clear
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
