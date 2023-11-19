import c from './EventsTable.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { EventsTableProps } from '../../../props/eventsTableProps';
import { EventType } from '../../../types/event';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton } from '@mui/material';
import { EventsActionTitle } from '../../../enums/EventsActionTitle';


export default function EventsTable({ rows, eventsCount, getPageRows, openDialog }: EventsTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    getPageRows(newPage + 1, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const addEvent = () => {
    openDialog(EventsActionTitle.Add);
  }

  const editEvent = () => {
    openDialog(EventsActionTitle.Edit);
  }

  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Videos count</TableCell>
              <TableCell>To review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: EventType) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>
                  <IconButton aria-label="edit event" onClick={editEvent}>
                    <EditIcon className={c.editIcon} />
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Link to={`/events/${row.id}`}>{row.title}</Link>
                </TableCell>
                <TableCell>{row.startTimeFormatted}</TableCell>
                <TableCell>{row.durationFormatted}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.locationName}</TableCell>
                <TableCell>{row.statusFormatted}</TableCell>
                <TableCell>{row.videosCount}</TableCell>
                <TableCell>{row.videosUnprocessedCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <footer className={c.pagination}>
        <Button variant="contained" onClick={addEvent}>Add</Button>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10, 25]}
          component="div"
          count={eventsCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </footer>
    </Paper >
  );
}