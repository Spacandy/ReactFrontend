// @flow
type IdentifyInfo = {
  id: number,
  email: string,
  firstName: string,
  lastName: string,
  displayName: string,
  isHost: boolean,
  avatarUrl: string,
  hasUsablePassword: boolean,
  contentTypeId: string,
};

export function login() {
  return {
    type: 'LOGIN',
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function signup() {
  return {
    type: 'SIGNUP',
  };
}

export function authenticate(id: number, token: string) {
  return {
    type: 'AUTHENTICATE',
    id: id,
    token: token,
  };
}

export function identify(info: IdentifyInfo) {
  return {
    type: 'IDENTIFY',
    id: info.id,
    email: info.email,
    firstName: info.firstName,
    lastName: info.lastName,
    isHost: info.isHost,
    displayName: info.displayName,
    avatarUrl: info.avatarUrl,
    hasUsablePassword: info.hasUsablePassword,
    contentTypeId: info.contentTypeId,
  };
}
