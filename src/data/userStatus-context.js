import React from 'react'

export const UserStatusContext = React.createContext({
  loggedIn: false,
  account: '',
  name: '',
  avatar: '',
  teamName: '',
  auth: 0,
  loading: true,
  contextLogout: () => {},
  contextChangeName: () => {}
});
