const initialState = {
  authenticated: false,
  id: 0,
  token: '',
  email: '',
  firstName: '',
  lastName: '',
  displayName: '',
  isHost: false,
  avatarUrl: '/static/img/test_photos/users/a1.jpg',
  hasUsablePassword: false,
  contentTypeId: '',
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { authenticated: true };
    case 'LOGOUT':
      return {
        authenticated: false,
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        isHost: false,
        displayName: '',
        contentTypeId: '',
        avatarUrl: '/static/img/test_photos/users/a1.jpg',
        hasUsablePassword: initialState.hasUsablePassword,
      };
    case 'SIGNUP':
      return { authenticated: true };
    case 'AUTHENTICATE':
      return {
        authenticated: true,
        id: action.id,
        token: action.token,
      };
    case 'IDENTIFY':
      return {
        authenticated: true,
        id: action.id,
        email: action.email,
        isHost: action.isHost,
        firstName: action.firstName,
        lastName: action.lastName,
        displayName: action.displayName,
        avatarUrl: action.avatarUrl,
        hasUsablePassword: action.hasUsablePassword,
        contentTypeId: action.contentTypeId,
      };
    default:
      return state;
  }
}
