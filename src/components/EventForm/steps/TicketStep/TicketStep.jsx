//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//
// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'react-apollo';
import { reduxForm, Field, FieldArray, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import classNames from 'classnames';
import format from 'date-fns/format';
import addHours from 'date-fns/add_hours';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { TextField, Select as SelectField, Checkbox } from 'lib/redux-form-material-ui';
import Hidden from '@material-ui/core/Hidden';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Zoom from '@material-ui/core/Zoom';

import Svg from 'components/Svg';

import { setEventFormTicket } from 'actions/eventForm/eventFormTicket';
import { setTicketTypeSuspendConfirmationModalState } from 'actions/modals/ticketTypeSuspendConfirmationModal';
import { setTicketTypeDeleteConfirmationModalState } from 'actions/modals/ticketTypeDeleteConfirmationModal';

import { validateRequired } from 'helpers/validation';
import errorArrayParser from 'helpers/errorArrayParser';
import subHours from 'date-fns/sub_hours';
type Props = {
  form: {},
  scheduleForm: {},
};

type State = {};

const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };

  return {
    root: {
      position: 'relative',
      transition: theme.transitions.create(['margin'], transition),
      padding: 10,
      '&:before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: theme.palette.divider,
        transition: theme.transitions.create(['opacity', 'background-color'], transition),
      },
      '&:first-child': {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        '&:before': {
          display: 'none',
        },
      },
      '&:last-child': {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
      },
      '&$expanded + &': {
        '&:before': {
          display: 'none',
        },
      },
    },
    expanded: {
      margin: `${theme.spacing.unit * 2}px 0 !important`,
      '&:first-child': {
        marginTop: 0,
      },
      '&:last-child': {
        marginBottom: 0,
      },
      '&:before': {
        opacity: 0,
      },
    },
    disabled: {
      backgroundColor: theme.palette.action.disabledBackground,
    },
    delete: {
      '& svg': {
        '&:hover': {
          '& path': {
            fill: '#D50000',
            d:
              'path("M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z")',
          },
        },
      },
    },
    suspend: {
      '& svg': {
        '&:hover': {
          '& path': {
            fill: '#D50000',
            d:
              'path("M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z")',
          },
        },
      },
    },
  };
};

class TicketStep extends Component<Props, State> {
  state: State;
  props: Props;

  UNSAFE_componentWillMount = () => {
    this.props.setEventFormTicket(null);
    // I'm using this under the name initialValue instead of initialValues intentionally.
    // When used as this.props.initialValues ticket values lock up because of my implementation of onAdd.
    if (this.props.initialValue)
      this.initializeForm(this.props.initialValue || [{ price: 0 }]);
  };

  handleExpand = index => {
    const { selectedTicket } = this.props;

    if (selectedTicket === index) {
      this.props.setEventFormTicket(null);
      return;
    }
    this.props.setEventFormTicket(index);
  };

  updateInitialScheduleFields = initValues => {
    if (initValues) {
      if (initValues.length > 0) {
        initValues.map((v, index) => {
          this.props.change(`tickets[${index}].salesStartDate`, v.salesStartDate);
          this.props.change(`tickets[${index}].salesStartTime`, v.salesStartTime);
          this.props.change(`tickets[${index}].salesEndDate`, v.salesEndDate);
          this.props.change(`tickets[${index}].salesEndTime`, v.salesEndTime);
        });
      }
    }
  };

  onAdd = (f, type = 'paid') => {
    console.log('f.length', f.length);
    if (!this.props.initialValues) {
      this.props.setEventFormTicket(null);
      const salesStartDate = format(subHours(new Date(), 12), 'YYYY-MM-DD');
      const salesEndDate =
        this.props.eventEndDate || format(addHours(new Date(), 25), 'YYYY-MM-DD');
      const salesStartTime = format(subHours(new Date(), 12), 'HH:mm');
      const salesEndTime =
        this.props.eventEndTime || format(addHours(new Date(), 25), 'HH:mm');

      this.props.change(`tickets[${f.length}].maxPerOrder`, 10);

      this.props.change(`tickets[${f.length}].salesStartDate`, salesStartDate);
      this.props.change(`tickets[${f.length}].salesEndDate`, salesEndDate);
      this.props.change(`tickets[${f.length}].salesStartTime`, salesStartTime);
      this.props.change(`tickets[${f.length}].salesEndTime`, salesEndTime);

      this.props.change(`tickets[${f.length}].type`, type);
      if (type === 'paid') {
        this.props.change(`tickets[${f.length}].feesType`, 'pass');
      } else if (type === 'free') {
        this.props.change(`tickets[${f.length}].price`, 0);
      }
    }
  };

  initializeForm = initialValues => {
    const values = initialValues;

    this.props.initialize({ tickets: values });
    return this.updateInitialScheduleFields(values);
  };

  checkPriceCap = (price, cap) => {
    if (Number(price) > cap) return cap;
    if (Number(price) < cap) return price;
  };

  handleOpenSuspendConfirmation = index => {
    this.props.setTicketTypeSuspendConfirmationModalState(true, index);
  };

  handleOpenDeleteConfirmation = index => {
    this.props.setTicketTypeDeleteConfirmationModalState(true, index);
  };

  handleDeleteConfirm = (f, index) => {
    f.remove(index);
    this.props.setTicketTypeDeleteConfirmationModalState(false, index);
    if (this.props.initialValue) {
      const ticketData = f.get(index);
      this.props.change(`tickets[${index}].deleteTicket`, true);
      this.props.change(`tickets[${index}].id`, ticketData.id);
    }
  };

  handleSuspendConfirm = (f, index) => {
    this.props.setTicketTypeSuspendConfirmationModalState(false, index);
    if (this.props.initialValue) {
      const ticketData = f.get(index);
      this.props.change(`tickets[${index}].suspendTicket`, true);
      this.props.change(`tickets[${index}].id`, ticketData.id);
    }
  };

  calculateFees = price => {
    const defaultPrice = 0;

    const processingFeeRate = 0.03;
    const serviceFeeRate = 0.029;
    const serviceFeeCap = 19.0;

    let ticketFee;
    let totalFees;

    if (price < 2) {
      ticketFee = 0.3;
    } else {
      ticketFee = 0.99;
    }

    if (Number(price) * Number(serviceFeeRate) <= Number(serviceFeeCap)) {
      const totalServiceFee = Number(price) * Number(serviceFeeRate);
      const totalWithTicketFee = Number(totalServiceFee) + Number(ticketFee);

      const _withPrice = Number(totalWithTicketFee) + Number(price);
      const totalProcessingFee = Number(_withPrice) * Number(processingFeeRate);

      totalFees = Number(totalProcessingFee) + Number(totalWithTicketFee);
      totalFees = this.formatPrice(totalFees);

      return price ? totalFees : defaultPrice;
    }
    // IF CAPPED THIS RUNS
    const totalServiceFee = Number(serviceFeeCap);
    const totalWithTicketFee = Number(totalServiceFee) + Number(ticketFee);

    const _withPrice = Number(totalWithTicketFee) + Number(price);
    const totalProcessingFee = Number(_withPrice) * Number(processingFeeRate);

    totalFees = Number(totalProcessingFee) + Number(totalWithTicketFee);
    totalFees = this.formatPrice(totalFees);

    return price ? totalFees : defaultPrice;
  };

  calculateCustomerCost = (price, feeType) => {
    var defaultPrice = 0;
    var totalPrice;

    if (feeType === 'pass') {
      totalPrice = parseFloat(price) + parseFloat(this.calculateFees(price));
      return price ? this.formatPrice(totalPrice) : this.formatPrice(defaultPrice);
    } else {
      return price ? this.formatPrice(price) : this.formatPrice(defaultPrice);
    }
  };

  calculateProfit = (price, feeType) => {
    var defaultPrice = 0;
    var totalProfit;

    if (feeType === 'pass') {
      return price ? this.formatPrice(price) : this.formatPrice(defaultPrice);
    } else {
      totalProfit = parseFloat(price) - parseFloat(this.calculateFees(price));
      return price ? this.formatPrice(totalProfit) : this.formatPrice(defaultPrice);
    }
  };

  renderPrompt = tickets => {
    const prompt = (
      <Typography style={{ textAlign: 'center' }}>
        Which ticket type would you like to create?
      </Typography>
    );
    if (tickets === undefined) return prompt;
    if (undefined || (tickets && tickets.length === 0)) {
      return prompt;
    }
  };

  renderTicketForms = ({ fields, meta: { touched, error, submitFailed } }) => {
    return (
      <div>
        {fields.map((ticket, index) => {
          const className = classNames(this.props.classes.root, {
            [this.props.classes.expanded]: this.props.selectedTicket === index,
            [this.props.classes.disabled]: false,
          });
          const nameError = this.props.errors
            ? errorArrayParser(this.props.errors[index], 'name')
            : undefined;
          const quantityError = this.props.errors
            ? errorArrayParser(this.props.errors[index], 'quantity')
            : undefined;
          const priceError = this.props.errors
            ? errorArrayParser(this.props.errors[index], 'price')
            : undefined;
          const maxPerOrderError = this.props.errors
            ? errorArrayParser(this.props.errors[index], 'max_per_order')
            : undefined;

          const salesStartTimeError = this.props.errors
            ? errorArrayParser(this.props.errors[index], 'sale_start_time')
            : undefined;
          const salesEndTimeError = this.props.errors
            ? errorArrayParser(this.props.errors[index], 'sale_end_time')
            : undefined;
          const salesStartDateError = this.props.errors
            ? errorArrayParser(this.props.errors[index], 'sale_start_date')
            : undefined;
          const salesEndDateError = this.props.errors
            ? errorArrayParser(this.props.errors[index], 'sale_end_date')
            : undefined;

          console.log('ticket:', this.props.tickets && this.props.tickets[index]);
          return (
            <div>
              <Zoom in={ticket}>
                <Paper className={className}>
                  <Hidden xsDown>
                    <div style={{ display: 'flex' }}>
                      <Field
                        name={`${ticket}.ticketName`}
                        component={TextField}
                        style={{ flexGrow: 1, marginRight: 5 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        required
                        message={nameError}
                        validate={validateRequired}
                        label="Ticket Name"
                      />
                      <Field
                        name={`${ticket}.quantity`}
                        component={TextField}
                        type="number"
                        style={{ maxWidth: 80, marginRight: 5 }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        required
                        message={quantityError}
                        validate={validateRequired}
                        label="Quantity"
                      />
                      {this.props.tickets ? (
                        this.props.tickets[index] ? (
                          this.props.tickets[index].price !== 0 ? (
                            <Field
                              name={`${ticket}.price`}
                              component={TextField}
                              type="number"
                              style={{
                                maxWidth: 80,
                              }}
                              parse={price => this.checkPriceCap(price, 5000)}
                              label="Price"
                              required
                              message={priceError}
                              validate={validateRequired}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">$</InputAdornment>
                                ),
                              }}
                              inputProps={{
                                min: '1.00',
                                max: '5000.00',
                                step: '0.01',
                              }}
                            />
                          ) : (
                            <FormControl
                              style={{
                                maxWidth: 80,
                              }}
                            >
                              <InputLabel required shrink>
                                Price
                              </InputLabel>
                              <Input value="FREE" disabled />
                            </FormControl>
                          )
                        ) : null
                      ) : null}
                      <IconButton
                        onClick={() => this.handleExpand(index)}
                        aria-label="Expand Ticket Settings"
                      >
                        <Svg icon="Pencil" />
                      </IconButton>
                      {this.props.tickets && this.props.tickets[index] &&
                        this.props.tickets[index].suspendTicket ? (
                        <IconButton
                          onClick={() => this.handleOpenSuspendConfirmation(index)}
                          className={this.props.classes.suspend}
                          aria-label="Resume Ticket Type"
                        >
                          <Svg icon="Share" />
                        </IconButton>
                        ) : (
                          this.props.tickets && this.props.tickets[index] &&
                            this.props.tickets[index].hasSoldTickets ? (
                        <IconButton
                          onClick={() => this.handleOpenSuspendConfirmation(index)}
                          className={this.props.classes.suspend}
                          aria-label="Suspend Ticket Type"
                        >
                          <Svg icon="Cancel" />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => this.handleOpenDeleteConfirmation(index)}
                          className={this.props.classes.delete}
                          aria-label="Delete Ticket Type"
                        >
                          <Svg icon="Trash" />
                        </IconButton>
                      ))}
                    </div>
                  </Hidden>
                  <Hidden smUp>
                    <div>
                      <div>
                        <Field
                          name={`${ticket}.ticketName`}
                          component={TextField}
                          style={{
                            flexGrow: 1,
                            marginRight: 5,
                            width: '100%',
                            marginBottom: 14,
                          }}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          required
                          message={nameError}
                          validate={validateRequired}
                          label="Ticket Name"
                        />
                        <div
                          style={{ display: 'flex', marginBottom: 14, flexWrap: 'wrap' }}
                        >
                          <Field
                            name={`${ticket}.quantity`}
                            component={TextField}
                            type="number"
                            style={{
                              flexGrow: 0,
                              flexShrink: 0,
                              flexBasis: 'calc(50% - 5px)',
                              marginRight: 10,
                            }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            required
                            message={quantityError}
                            validate={validateRequired}
                            label="Quantity"
                          />
                          {this.props.tickets ? (
                            this.props.tickets[index] ? (
                              this.props.tickets[index].price !== 0 ? (
                                <Field
                                  name={`${ticket}.price`}
                                  component={TextField}
                                  type="number"
                                  style={{
                                    flexGrow: 0,
                                    flexShrink: 0,
                                    flexBasis: 'calc(50% - 5px)',
                                  }}
                                  parse={price => this.checkPriceCap(price, 5000)}
                                  label="Price"
                                  required
                                  message={priceError}
                                  validate={validateRequired}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">$</InputAdornment>
                                    ),
                                  }}
                                  inputProps={{
                                    min: '1.00',
                                    max: '5000.00',
                                    step: '0.01',
                                  }}
                                />
                              ) : (
                                <FormControl
                                  style={{
                                    flexGrow: 0,
                                    flexShrink: 0,
                                    flexBasis: 'calc(50% - 5px)',
                                  }}
                                >
                                  <InputLabel required shrink>
                                    Price
                                  </InputLabel>
                                  <Input value="FREE" disabled />
                                </FormControl>
                              )
                            ) : null
                          ) : null}
                          <div>
                            <IconButton
                              onClick={() => this.handleExpand(index)}
                              aria-label="Expand Ticket Settings"
                            >
                              <Svg icon="Settings" />
                            </IconButton>
                            {this.props.tickets && this.props.tickets[index] &&
                              this.props.tickets[index].suspendTicket ? (
                              <IconButton
                                onClick={() => this.handleOpenSuspendConfirmation(index)}
                                className={this.props.classes.suspend}
                                aria-label="Resume Ticket Type"
                              >
                                <Svg icon="Share" />
                              </IconButton>
                              ) : (
                                this.props.tickets && this.props.tickets[index] &&
                                  this.props.tickets[index].hasSoldTickets ? (
                              <IconButton
                                onClick={() => this.handleOpenSuspendConfirmation(index)}
                                className={this.props.classes.suspend}
                                aria-label="Suspend Ticket Type"
                              >
                                <Svg icon="Cancel" />
                              </IconButton>
                            ) : (
                              <IconButton
                                onClick={() => this.handleOpenDeleteConfirmation(index)}
                                className={this.props.classes.delete}
                                aria-label="Delete Ticket Type"
                              >
                                <Svg icon="Trash" />
                              </IconButton>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Hidden>

                  <Collapse
                    in={this.props.selectedTicket === index}
                    style={{ display: 'block' }}
                  >
                    <Field name="id" component={TextField} style={{ display: 'none' }} />
                    <br />
                    <Field
                      name={`${ticket}.description`}
                      component={TextField}
                      multiline
                      rows="4"
                      fullWidth
                      label="Ticket Description"
                    />
                    <br />
                    <br />
                    {this.props.tickets
                      ? this.props.tickets[index]
                        ? this.props.tickets[index].price !== 0
                          ? [
                              <Field
                                name={`${ticket}.feesType`}
                                color="primary"
                                component={SelectField}
                                label="Fees"
                                required
                              >
                                <MenuItem
                                  selected={this.props.addressRegion === 'pass'}
                                  value="pass"
                                >
                                  Passed to Attendee
                                </MenuItem>
                                <MenuItem
                                  selected={this.props.addressRegion === 'absorb'}
                                  value="absorb"
                                >
                                  Absorbed by Host (You)
                                </MenuItem>
                              </Field>,
                              <br />,
                              <br />,
                            ]
                          : null
                        : null
                      : null}
                    <div style={{ display: 'flex' }}>
                      <Field
                        name={`${ticket}.salesStartDate`}
                        label="Sale Start Date"
                        component={TextField}
                        required
                        fullWidth
                        type="date"
                        message={salesStartDateError}
                        validate={validateRequired}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <Field
                        name={`${ticket}.salesStartTime`}
                        label="Sale Start Time"
                        component={TextField}
                        required
                        fullWidth
                        message={salesStartTimeError}
                        validate={validateRequired}
                        type="time"
                        inputProps={{ step: '300' }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                    <br />
                    <div style={{ display: 'flex' }}>
                      <Field
                        name={`${ticket}.salesEndDate`}
                        label="Sale End Date"
                        component={TextField}
                        required
                        fullWidth
                        type="date"
                        message={salesEndDateError}
                        validate={validateRequired}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <Field
                        name={`${ticket}.salesEndTime`}
                        label="Sale End Time"
                        component={TextField}
                        required
                        fullWidth
                        message={salesEndTimeError}
                        validate={validateRequired}
                        type="time"
                        inputProps={{}}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </div>
                    <br />
                    <Field
                      name={`${ticket}.maxPerOrder`}
                      type="number"
                      component={TextField}
                      required
                      message={maxPerOrderError}
                      validate={validateRequired}
                      fullWidth
                      label="Max Tickets Per Purchase"
                    />
                    <br />
                    <br />
                    <FormControlLabel
                      control={
                        <Field
                          name={`${ticket}.showQuantity`}
                          color="primary"
                          component={Checkbox}
                        />
                      }
                      label="Display Quantity?"
                    />
                  </Collapse>
                </Paper>
              </Zoom>
            </div>
          );
        })}
        <div style={{ margin: '0 auto', width: 270 }}>
          {this.renderPrompt(this.props.tickets)}
          <Button
            color="inherit"
            style={{
              border: '.5px solid',
              marginBottom: 20,
              marginTop: 20,
              width: 125,
              color: '#949494',
            }}
            onClick={() => this.onAdd(fields, 'free')}
          >
            <Svg icon="Add" />
            Free Ticket
          </Button>
          <Button
            color="inherit"
            style={{
              border: '.5px solid',
              marginBottom: 20,
              width: 125,
              marginTop: 20,
              marginLeft: 20,
              color: '#949494',
            }}
            onClick={() => this.onAdd(fields)}
          >
            <Svg icon="Add" />
            Paid Ticket
          </Button>
        </div>
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.props.deleteConfirmationModal.open}
          onClose={this.handleCloseConfirmation}
          disableBackdropClick
        >
          <Typography
            style={{ textAlign: 'center', margin: '10px 0' }}
            variant="headline"
          >
            Confirm Ticket Type Deletion
          </Typography>
          <DialogContent>
            <Typography variant="subheading">
              Are you sure you want to delete this ticket type?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" onClick={this.handleCloseConfirmation}>
              Cancel
            </Button>
            <Button
              color="inherit"
              style={{ color: '#D50000' }}
              onClick={() =>
                this.handleDeleteConfirm(
                  fields,
                  this.props.deleteConfirmationModal.ticketId,
                )
              }
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          fullScreen={this.props.fullScreen}
          open={this.props.suspendConfirmationModal.open}
          onClose={this.handleSuspendCloseConfirmation}
          disableBackdropClick
        >
          <Typography
            style={{ textAlign: 'center', margin: '10px 0' }}
            variant="headline"
          >
            Confirm Ticket Type Suspension
          </Typography>
          <DialogContent>
            <Typography variant="subheading">
              Are you sure you want to suspend this ticket type?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" onClick={this.handleSuspendCloseConfirmation}>
              Cancel
            </Button>
            <Button
              color="inherit"
              style={{ color: '#D50000' }}
              onClick={() =>
                this.handleSuspendConfirm(
                  fields,
                  this.props.suspendConfirmationModal.ticketId,
                )
              }
            >
              Suspend
            </Button>
          </DialogActions>
        </Dialog>
        {(touched || submitFailed) && error && <span>{error}</span>}
      </div>
    );
  };

  handleCloseConfirmation = () => {
    this.props.setTicketTypeDeleteConfirmationModalState(false, null);
  };

  handleSuspendCloseConfirmation = () => {
    this.props.setTicketTypeSuspendConfirmationModalState(false, null);
  };

  render() {
    return (
      <div style={{ width: '100%' }}>
        <FieldArray
          name="tickets"
          rerenderOnEveryChange
          component={this.renderTicketForms}
        />
        {(this.props.tickets === undefined || this.props.tickets.length === 0) &&
        this.props.errors ? (
          <Typography style={{ textAlign: 'center', fontSize: 14, color: '#f44336' }}>
            At least one ticket type is required
          </Typography>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const scheduleSelector = formValueSelector(ownProps.scheduleForm);
  const ticketsSelector = formValueSelector(ownProps.form);
  return {
    selectedTicket: state.eventForm.ticket.ticket,
    suspendConfirmationModal: state.modals.ticketTypeSuspendConfirmationModal,
    deleteConfirmationModal: state.modals.ticketTypeDeleteConfirmationModal,
    eventStartDate: scheduleSelector(state, 'startDate'),
    eventStartTime: scheduleSelector(state, 'startTime'),
    eventEndDate: scheduleSelector(state, 'endDate'),
    eventEndTime: scheduleSelector(state, 'endTime'),
    tickets: ticketsSelector(state, 'tickets'),
  };
};

const mapDispatchToProps = dispatch => ({
  setEventFormTicket: state => {
    dispatch(setEventFormTicket(state));
  },
  setTicketTypeSuspendConfirmationModalState: (state, ticketId) => {
    dispatch(setTicketTypeSuspendConfirmationModalState(state, ticketId));
  },
  setTicketTypeDeleteConfirmationModalState: (state, ticketId) => {
    dispatch(setTicketTypeDeleteConfirmationModalState(state, ticketId));
  },
});

export default compose(
  withStyles(styles),
  withMobileDialog(),
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ destroyOnUnmount: false, enableReinitialize: true }),
)(TicketStep);
