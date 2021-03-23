import React, { useEffect } from 'react'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'

const Dashboard = ({getCurrentProfile, deleteAccount, profileInfo, user}) => {
    const {isLoading, profile} = profileInfo

    useEffect(() => {
        getCurrentProfile()
    }, [])

    return (
        <>
            {
                (isLoading && <Spinner/>) ||
                <div>
                    <h1 className='large'>Dashboard</h1>
                    <p className='lead'><i className='fas fa-user'>{' '} Hi, {user.name}</i></p>
                </div>
            }

            {
                !isLoading && !profile &&
                <p> There is no profile for this user, but you can
                    <span> </span>
                    <Link to='/create-profile'>create profile</Link>
                </p>
            }

            {
                !isLoading && profile &&
                <>
                    <DashboardActions/>
                    <Experience experience={profile.experience}/>
                    <Education education={profile.education}/>
                    <div className="my-2">
                        <button className="btn btn-danger"
                                onClick={() => deleteAccount()}>
                            <i className="fas fa-user"></i> delete account
                        </button>
                    </div>
                </>
            }
        </>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    profileInfo: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profileInfo: state.profile,
        user: state.auth.user
    }
}

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard)