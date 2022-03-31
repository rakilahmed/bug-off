import { useState } from 'react';
import {
  Box,
  FormGroup,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
} from '@mui/material/';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useTicketContext } from './TicketProvider';

const TicketForm = ({ title, openEditForm = false, ticket }) => {
  const { addTicket, editTicket } = useTicketContext();
  const [showForm, setShowForm] = useState(openEditForm ? openEditForm : false);
  const [titleInput, setTitleInput] = useState(ticket ? ticket.title : '');
  const [assignedToInput, setAssignedToInput] = useState(
    ticket ? ticket.assignedTo : ''
  );
  const [priority, setPriority] = useState(ticket ? ticket.priority : '');
  const [dueDate, setDueDate] = useState(ticket ? ticket.dueDate : new Date());
  const [summaryInput, setSummaryInput] = useState(
    ticket ? ticket.summary : ''
  );
  const [titleStatus, setTitleStatus] = useState(false);
  const [assignedToStatus, setAssignedToStatus] = useState(false);
  const [priorityStatus, setPriorityStatus] = useState(false);
  const [dueDateStatus, setDueDateStatus] = useState(false);
  const [summaryStatus, setSummaryStatus] = useState(false);

  const handleForm = () => {
    setShowForm(!showForm);
    setTitleInput('');
    setAssignedToInput('');
    setSummaryInput('');
    setPriority('Low');
    setTitleStatus(false);
    setAssignedToStatus(false);
    setSummaryStatus(false);
  };

  const handleEditForm = () => {
    setTitleInput(ticket.title);
    setAssignedToInput(ticket.assignedTo);
    setSummaryInput(ticket.summary);
    setPriority(ticket.priority);
    setDueDate(ticket.dueDate);
    setTitleStatus(false);
    setAssignedToStatus(false);
    setSummaryStatus(false);
    setPriorityStatus(false);
    setDueDateStatus(false);
  };

  const validateTitle = (event) => {
    setTitleInput(event.target.value);
    event.target.value === '' ? setTitleStatus(false) : setTitleStatus(true);
  };

  const validateAssigned = (event) => {
    setAssignedToInput(event.target.value);
    event.target.value === ''
      ? setAssignedToStatus(false)
      : setAssignedToStatus(true);
  };

  const validatePriority = (event) => {
    setPriority(event.target.value);
    event.target.value === ticket.priority
      ? setPriorityStatus(false)
      : setPriorityStatus(true);
  };

  const validateDueDate = (newDate) => {
    setDueDate(newDate);
    newDate === ticket.dueDate
      ? setDueDateStatus(false)
      : setDueDateStatus(true);
  };

  const validateSummary = (event) => {
    setSummaryInput(event.target.value);
    event.target.value === ''
      ? setSummaryStatus(false)
      : setSummaryStatus(true);
  };

  const handleAddTicket = (event) => {
    event.preventDefault();
    addTicket(titleInput, assignedToInput, priority, dueDate, summaryInput);
    setShowForm(!showForm);
  };

  const handleEditTicket = (event) => {
    event.preventDefault();
    editTicket(
      ticket.ticketId,
      titleInput,
      assignedToInput,
      priority,
      dueDate,
      summaryInput
    );
  };

  return (
    <Box>
      {!openEditForm && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">{title}</Typography>
          <Button
            variant="contained"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#363740',
              '&:hover': { backgroundColor: '#363740' },
            }}
            onClick={!openEditForm ? handleForm : handleEditForm}
          >
            {!showForm ? 'New Ticket' : 'Cancel'}
          </Button>
        </Box>
      )}
      {showForm && (
        <Box
          sx={{
            maxWidth: '33rem',
            margin: '0 auto 1rem auto',
          }}
        >
          <FormGroup>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                required
                margin="normal"
                id="ticket-title"
                label="Ticket Title"
                variant="outlined"
                value={titleInput}
                onChange={validateTitle}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="success"
                sx={{
                  margin: '0.5rem 0 0 1rem',
                  backgroundColor: '#363740',
                  '&:hover': { backgroundColor: '#66bb6a' },
                }}
                disabled={
                  !openEditForm
                    ? !titleStatus || !assignedToStatus || !summaryStatus
                    : !titleStatus &&
                      !assignedToStatus &&
                      !summaryStatus &&
                      !priorityStatus &&
                      !dueDateStatus
                }
                onClick={openEditForm ? handleEditTicket : handleAddTicket}
              >
                {openEditForm ? 'Update' : 'Add'}
              </Button>
            </Box>
            <TextField
              required
              margin="normal"
              id="ticket-assigned"
              label="Assigned To"
              variant="outlined"
              value={assignedToInput}
              onChange={validateAssigned}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <FormControl fullWidth sx={{ mt: 1, mr: 1 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priority}
                  label="Priority"
                  onChange={
                    openEditForm
                      ? validatePriority
                      : (e) => setPriority(e.target.value)
                  }
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  disablePast
                  value={dueDate}
                  onChange={openEditForm ? validateDueDate : setDueDate}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      label="Due Date"
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              required
              margin="normal"
              id="ticket-summary"
              label="Summary"
              variant="outlined"
              multiline
              rows={5}
              value={summaryInput}
              onChange={validateSummary}
            />
          </FormGroup>
        </Box>
      )}
    </Box>
  );
};

export default TicketForm;