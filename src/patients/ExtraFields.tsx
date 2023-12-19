import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { useState } from 'react';

export default function ExtraFields({ fetchedFields, onSubmitExtraFields }: any) {
  const [extraFields, setExtraFields] = useState(fetchedFields);
  const [nextID, setNextID] = useState(fetchedFields.length);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitExtraFields(extraFields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">Extra Fields</Typography>
        </Box>
        <Divider />
        <Stack spacing={2} sx={{ my: 1 }}>
          {extraFields.map(({ id, key, value, type }: any) => (
            <FormControl sx={{ flexGrow: 1 }} key={id}>
              <Stack direction="row" spacing={2} useFlexGap>
                <Input
                  size="sm"
                  type="text"
                  placeholder="Type"
                  defaultValue={key}
                  onChange={(e) => {
                    const field = extraFields.find((a: any) => a.id === id);
                    field.key = e.target.value;
                  }}
                />
                <Input
                  size="sm"
                  fullWidth
                  type={type}
                  placeholder="Value"
                  defaultValue={value}
                  onChange={(e) => {
                    const field = extraFields.find((a: any) => a.id === id);
                    field.value = e.target.value;
                  }}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    setExtraFields(extraFields.filter((a: any) => a.id !== id));
                  }}
                  variant="plain">
                  <ClearIcon />
                </Button>
              </Stack>
            </FormControl>
          ))}
        </Stack>
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ pt: 2, alignSelf: 'flex-end' }}>
            <Button
              size="sm"
              color="neutral"
              onClick={() => {
                setExtraFields([
                  ...extraFields,
                  { id: nextID + 1, key: '', value: '', type: 'text' }
                ]);
                setNextID(nextID + 1);
              }}
              variant="soft">
              New Field
            </Button>
            <Button type="submit" size="sm" variant="solid">
              Save
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </form>
  );
}
