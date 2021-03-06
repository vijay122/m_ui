import React from 'react';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

const BadgeExampleSimple = () => (
  <div>
    <Badge
      badgeContent={4}
      primary={true}
    >
      <NotificationsIcon />
    </Badge>
  </div>
);

export default BadgeExampleSimple;