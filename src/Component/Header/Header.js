import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router'
import classNames from 'classnames'
import styles from './Header.scss'
import { ReactComponent as LogoIcon } from '../../img/icon/logo.svg'
import { ReactComponent as AddUserIcon } from '../../img/icon/addUser.svg'
import { ReactComponent as LoginIcon } from '../../img/icon/login.svg'
import { AddingNewUserPage } from '../AddingNewUserPage/AddingNewUserPage'
import ListUsersPage from '../ListUsersPage/ListUsersPage'
import EditUserPage from '../EditUserPage/EditUserPage'
import { createUser } from '../../Actions'


const cx = classNames.bind(styles)

class Header extends Component {
  forwardListUsers = () => {
    const { history } = this.props
    const { pathname } = history.location
    if (pathname !== '/ListUsers') {
      history.push('/ListUsers')
    }
  }

  render() {
    const { createUser } = this.props
    return (
      <Fragment>
        <header>
          <div className={cx('logoA')}>
            <LogoIcon className={cx('logoIcon')} alt='logoIcon' />
          </div>
          <div className={cx('addUserA')} onClick={createUser} >
            <AddUserIcon className={cx('addUserIcon')} alt='addUserIcon' />
            <span>Add new user</span>
          </div>
          <div className={cx('loginA')} onClick={this.forwardListUsers}>
            <LoginIcon className={cx('loginIcon')} alt='loginIcon' />
            <span>List of users</span>
          </div>
        </header>
        <Switch>
          <Route exact path='/ListUsers' component={ListUsersPage} />
          <Route exact path='/EditUser' component={EditUserPage} />
          <Route path='/' component={AddingNewUserPage} />
          <Redirect to='/NodFound' />
        </Switch>
      </Fragment>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object.isRequired,
  createUser: PropTypes.func.isRequired,
}

export default connect(
  null,
  { createUser },
)(Header)
