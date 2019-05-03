import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { reduxForm, Field } from 'redux-form'
import styles from './ProfileEditing.scss'
import { renderFieldRadioProfile } from './renderFieldRadioProfile/renderFieldRadioProfile'
import { renderDateTimePickerProfile } from './renderDateTimePickerProfile/renderDateTimePickerProfile'
import { renderFieldInputNewUser } from '../renderFieldInputNewUser/renderFieldInputNewUser'
import { profileEditingSave } from '../../../Actions'


const cx = classNames.bind(styles)


class ProfileEditing extends Component {
    onSubmit = values => {
      const { profileEditingSave, id } = this.props
      profileEditingSave(values.firstName, values.lastName, values.birthDate, values.email,
        values.address, values.gender, id)
    }

    render() {
      const { handleSubmit } = this.props
      return (
        <div className={cx('profile')}>
          <form className={cx('profile__form')} onSubmit={handleSubmit(this.onSubmit)}>
            <div className={cx('profile__sideLeft')}>
              <Field
                component={renderFieldInputNewUser}
                type='text'
                span
                label='First name'
                name='firstName'
                idField='fieldFirstName'
                classNameLabel='fieldInputNewUser'
              />
              <Field
                component={renderFieldInputNewUser}
                type='text'
                span
                label='Last name'
                name='lastName'
                idField='fieldLastName'
                classNameLabel='fieldInputNewUser'
              />
              <Field name='birthDate' component={renderDateTimePickerProfile} />
            </div>
            <div className={cx('profile__sideRight')}>
              <Field
                component={renderFieldInputNewUser}
                type='text'
                span
                label='Email'
                name='email'
                idField='fieldEmail'
                classNameLabel='fieldInputNewUser'
              />
              <Field
                component={renderFieldInputNewUser}
                type='text'
                span
                label='Address'
                name='address'
                idField='fieldAddress'
                classNameLabel='fieldInputNewUser'
              />
              <h5>Gender</h5>
              <div className={cx('wrapperGender')}>
                <Field
                  component={renderFieldRadioProfile}
                  type='radio'
                  label='Male'
                  name='gender'
                  value='male'
                  idField='fieldMale'
                />
                <Field
                  component={renderFieldRadioProfile}
                  type='radio'
                  label='Female'
                  name='gender'
                  value='female'
                  idField='fieldFemale'
                />
              </div>
              <button type='submit' className={cx('saveNewListButton')}>Save</button>
            </div>
          </form>
        </div>
      )
    }
}

ProfileEditing.propTypes = {
  id: PropTypes.number.isRequired,
  profileEditingSave: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}


ProfileEditing = reduxForm({
  validate: (values, props) => {
    const errors = {}
    const { userEmailList } = props
    if (!values.birthDate) {
      errors.birthDate = 'Missing Birth Date'
    } else if ((new Date().getFullYear() - values.birthDate.getFullYear()) < 18) {
      errors.birthDate = 'Sorry, you must be at least 18 years old'
    }

    if (!values.gender) {
      errors.gender = 'Missing Gender'
    }

    if (!values.firstName) {
      errors.firstName = 'Missing First name'
    } else if (values.firstName.length <= 2) {
      errors.firstName = 'Must be 3 characters or more'
    }
    if (!values.lastName) {
      errors.lastName = 'Missing Last name'
    } else if (values.lastName.length <= 2) {
      errors.lastName = 'Must be 3 characters or more'
    }

    if (!values.address) {
      errors.address = 'Missing Address'
    }
    if (!values.email) {
      errors.email = 'Missing Email'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    } else {
      userEmailList.forEach(userName => {
        errors.email = values.email === userName ? 'already have this email in the database' : null
      })
    }
    return errors
  },
  form: 'ProfileEditing',
  enableReinitialize: true,
})(ProfileEditing)


const mapStateToProps = state => {
  const { users } = state.listUsers
  const { pathname } = state.router.location
  const id = Number(pathname.slice(9, pathname.indexOf('/', 9)))
  const user = { ...users[id - 1] }
  const {
    firstName, lastName, birthDate, email, address, gender,
  } = user
  const userEmailFilter = users.filter(user => user.id !== id)
  const userEmailList = userEmailFilter.map(user => user.email)
  return {
    initialValues: {
      firstName, lastName, birthDate, email, address, gender,
    },
    userEmailList,
    id,
  }
}

export default connect(
  mapStateToProps,
  { profileEditingSave },
)(ProfileEditing)
