import React from 'react';
import { IconButton, Paper, List, ListItem, Typography, Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const NotificationPanel = ({ notifications, openNotifications, handleCloseNotification }) => {
  return (
    openNotifications && (
      <Paper
        elevation={4}
        style={{
          position: 'fixed',
          bottom: 50,
          right: 20,
          top: 80,
          maxWidth: 1000,
          maxHeight: 300,
          padding: '4px',
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
          overflowY: 'auto',
          border: '1px solid',
          borderRadius: '4px',
        }}
      >
        <List>
          {notifications.map(notification => (
            <ListItem key={notification.id}>
              <Card style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexGrow: 1, padding: '4px' }}>
                <Typography variant="body2" component="p">
                  {notification.message}
                </Typography>
                <IconButton
                  edge="end"
                  aria-label="close"
                  onClick={() => handleCloseNotification(notification.id)}
                >
                  <CloseIcon style={{ color: 'black' }} />
                </IconButton>
              </Card>
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  );
};

export default NotificationPanel;
