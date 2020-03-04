export default theme => ({
  root: {
    marginTop: 40,
    '&:hover': {
      '& div': {
        '& span': {
          fill: '#00aeef',
          color: '#00aeef',
        },
      },
      '& svg': {
        '& path': {
          fill: '#00aeef',
          color: '#00aeef',
        },
      },
    },
  },
  helperRoot: {
    color: 'white',
  },
  select: {
    color: 'white',
  },
  inputLabelRoot: {
    color: 'white',
    left: 20,
  },
  inkbar: {
    '&:after': {
      backgroundColor: 'white',
    },
  },
  selectIcon: {
    color: 'white',
  },
  listItemTextSelected: {
    color: '#00aeef',
  },
  formControl: {
    width: 200,
    padding: '0 20px 10px',
  },

  menuRoot: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
  subheader: {
    outline: 'none',
  },
  menuFocusRoot: {
    '&:focus': {
      outline: 0,
    },
  },
  primaryText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  gutters: { paddingRight: '2px !important' },
  listItemActive: {
    '& div': {
      '& span': {
        fill: '#00aeef',
        color: '#00aeef',
      },
    },
    '& svg': {
      fill: '#00aeef',
      color: '#00aeef',
    },
  },
  listItemHover: {
    '&:hover': {
      '& div': {
        '& span': {
          fill: '#00aeef',
          color: '#00aeef',
        },
      },
      '& svg': {
        '& path': {
          fill: '#00aeef',
          color: '#00aeef',
        },
      },
    },
  },
});
