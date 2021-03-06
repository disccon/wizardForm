import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash/core'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { formValueSelector } from 'redux-form'
import { saveNewUserData } from '../../../actions/actionNewUser'
import '../../../components/UserFormBox/UserFormBox.scss'
import ContactsForm from '../../../components/UserFormBox/ContactsForm/ContactsForm'

class CreateUserContacts extends Component {
  onSubmit = values => {
    const {
      saveNewUserData, push,
    } = this.props
    push('/capabilities')
    saveNewUserData({
      ...values,
      contactsFilled: true,
    })
  }

  backContacts = () => {
    const {
      saveNewUserData, companyForm, githubLinkForm, facebookLinkForm, languageForm, faxForm, phoneArrayForm, push,
    } = this.props
    saveNewUserData({
      company: companyForm,
      githubLink: githubLinkForm,
      facebookLink: facebookLinkForm,
      language: languageForm,
      fax: faxForm,
      phoneArray: phoneArrayForm,
    })
    push('/profile')
  }

  render() {
    const wrapperButton = (
      <Fragment>
        <button type='button' onClick={this.backContacts} className='userFormBox__back'>Back</button>
        <button type='submit' className='userFormBox__forward'>Forward</button>
      </Fragment>
    )
    return (
      <ContactsForm
        onSubmit={this.onSubmit}
        wrapperButton={wrapperButton}
        initialValues={_.pick(this.props, ['company', 'githubLink', 'facebookLink', 'language',
          'fax', 'phoneArray'])}
      />
    )
  }
}

CreateUserContacts.propTypes = {
  companyForm: PropTypes.string,
  githubLinkForm: PropTypes.string,
  facebookLinkForm: PropTypes.string,
  languageForm: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  faxForm: PropTypes.string,
  phoneArrayForm: PropTypes.array,
  saveNewUserData: PropTypes.func,
  push: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  const selector = formValueSelector('ContactsForm')
  const companyForm = selector(state, 'company')
  const githubLinkForm = selector(state, 'githubLink')
  const facebookLinkForm = selector(state, 'facebookLink')
  const languageForm = selector(state, 'language')
  const faxForm = selector(state, 'fax')
  const phoneArrayForm = selector(state, 'phoneArray')
  const {
    company, githubLink, facebookLink, language, fax, phoneArray,
  } = state.newUser
  return {
    company,
    githubLink,
    facebookLink,
    language,
    fax,
    phoneArray,

    companyForm,
    githubLinkForm,
    facebookLinkForm,
    languageForm,
    faxForm,
    phoneArrayForm,
  }
}

export default connect(
  mapStateToProps,
  { push, saveNewUserData },
)(CreateUserContacts)
