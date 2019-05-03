import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import DatePicker from 'react-date-picker'
import styles from './renderDateTimePickerProfile.scss'
import { ReactComponent as CalendarIcon } from '../../../../img/icon/calendar.svg'


const cx = classNames.bind(styles)

export const renderDateTimePickerProfile = ({ input, meta: { touched, error } }) => (
  <Fragment>
    <div className={cx('profile__birthDate')}>
      <span className={cx('profile__birthDateH')}>Birth date</span>
      <span className={cx('profile__birthDateSpan')}>*</span>
      <DatePicker
        format='dd/MM/yyyy'
        clearIcon=''
        calendarIcon={<CalendarIcon />}
        className={cx('profile__datePicker', { profile__datePickerError: touched && error })}
        isOpen
        placeholder='DD/MM/YYYY'
        locale='en'
        {...input}
        onBlur={() => input.onBlur()}
        onChange={input.onChange}
        value={input.value}
        calendarClassName='profile__react-calendar'
      />
      {touched && error && <p className={cx('birthDate__error')}>{error}</p>}
    </div>
  </Fragment>
)


renderDateTimePickerProfile.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
}
