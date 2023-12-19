import { EditNote } from '@mui/icons-material';
import {
  Box,
  Button,
  CardActions,
  CardOverflow,
  FormLabel,
  IconButton,
  Stack,
  Textarea,
  Tooltip
} from '@mui/joy';
import Card from '@mui/joy/Card';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';
import dayjs from 'dayjs';
import * as React from 'react';
import { useState } from 'react';

export default function Notes({ fetchedNotes, onSubmitNotes }: any) {
  const [notes, setNotes] = useState(fetchedNotes);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitNotes(notes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Stack direction="row" sx={{ mb: 1 }} justifyContent="space-between">
          <Box>
            <Typography level="title-md">Notes</Typography>
          </Box>
          <Stack justifyContent="flex-end">
            <Tooltip title="New Note">
              <IconButton
                size="sm"
                onClick={() => {
                  setNotes(
                    [...notes, { date: new Date(), text: '' }].sort(
                      (a: any, b: any) => b.date - a.date
                    )
                  );
                  console.log(notes.sort((a: any, b: any) => b.date - a.date));
                }}>
                <EditNote />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        <Divider />
        {notes.map((note: any, index: number) => (
          <FormControl sx={{ flexGrow: 1 }} key={index}>
            <Stack spacing={1} useFlexGap>
              <Stack spacing={2} sx={{ my: 1 }}>
                <FormLabel>{dayjs(note.date).format('MMM D YYYY, h:m A')}</FormLabel>
                <Textarea
                  key={`${note.date.toString()}`}
                  aria-label="empty textarea"
                  size="sm"
                  minRows={8}
                  sx={{ mt: 1.5 }}
                  defaultValue={note.text}
                  onChange={(e: any) => {
                    notes[index].text = e.target.value;
                  }}
                />
              </Stack>
            </Stack>
          </FormControl>
        ))}
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button type="submit" size="sm" variant="solid">
              Save
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
    </form>
  );
}
