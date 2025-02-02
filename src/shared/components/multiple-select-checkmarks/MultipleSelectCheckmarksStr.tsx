import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FilterParent } from '../../../enums/FilterParent';
import { IOptionStr } from '../../../types/IOptionStr';
import { IMultipleSelectCheckmarksPropsStr } from '../../../props/IMultipleSelectCheckmarksPropsStr';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelectCheckmarksStr({ options, defaultOptions, updateSelectedOptions, buttonText, width, parent }: IMultipleSelectCheckmarksPropsStr) {
  const [selectedIds, setSelectedIds] = useState<Array<string>>(defaultOptions);
  const selectedLabels: string[] = selectedIds.length > 0 && options.length > 0 ?
    selectedIds.map((selected) => options.find(option => option.id === selected)?.label).filter((label) => label !== undefined) : [];

  function onChangeHandler(event: SelectChangeEvent<Array<string>>) {
    const { target: { value: newSelectedIds } } = event;
    if (Array.isArray(newSelectedIds)) {
      setSelectedIds(newSelectedIds);
      updateSelectedOptions(newSelectedIds);
    }
  }

  return (
    <FormControl sx={{ width, backgroundColor: 'white' }}>
      <InputLabel id="multiple-checkbox-label">{buttonText}</InputLabel>
      <Select
        labelId="multiple-checkbox-label"
        id="multiple-checkbox"
        multiple
        value={selectedIds}
        onChange={onChangeHandler}
        input={<OutlinedInput label={buttonText} />}
        renderValue={() => selectedLabels.join(', ')}
        MenuProps={MenuProps}
        defaultValue={defaultOptions}
        size={parent === FilterParent.Events ? 'small' : 'medium'}
      >
        {options.map((option: IOptionStr) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox checked={selectedIds.indexOf(option.id) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
