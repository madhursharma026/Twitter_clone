import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { LoginDetailsSave } from '../actions';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import AuthLogo from '../public/svgs/AuthLogo.svg';
import { useDispatch, useSelector } from 'react-redux';
import HeaderLogoWhite from '../public/svgs/DarkThemeSvgs/HeaderLogoWhite.svg';

function Auth() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [UsernameGetting, setUsernameGetting] = useState("")
  const [Password, setPassword] = useState("")
  const [open, setOpen] = React.useState(false);
  const [AlertMessage, setAlertMessage] = useState("")
  const [EmailAddress, setEmailAddress] = useState("")
  const [LoginPassword, setLoginPassword] = useState("")
  const [AlertMessageBg, setAlertMessageBg] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [LoginEmailAddress, setLoginEmailAddress] = useState("")
  const [UploadProfilePhoto, setUploadProfilePhoto] = useState("")
  const gettingUserDetails = useSelector((state: any) => state.ReduxCommands.LoginDetails);

  function handleCloseSignupModal() {
    setShowLoginModal(false)
    setShowSignupModal(false)
  }
  function handleShowSignupModal() {
    setShowLoginModal(false)
    setShowSignupModal(true)
  }

  function handleCloseLoginModal() {
    setShowSignupModal(false)
    setShowLoginModal(false)
  }
  function handleShowLoginModal() {
    setShowSignupModal(false)
    setShowLoginModal(true)
  }

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function submitSignupForm(e: React.SyntheticEvent) {
    e.preventDefault()
    if (Password === ConfirmPassword) {
      // let Username = UsernameGetting
      // let email = EmailAddress
      // let password = Password
      let formdata = new FormData();
      formdata.append("Username", UsernameGetting);
      formdata.append("email", EmailAddress);
      formdata.append("password", Password);
      formdata.append("profileImage", UploadProfilePhoto);
      // let data = { formdata }
      let result = await fetch("http://127.0.0.1:5000/auth/signup", {
        method: "POST",
        body: formdata
      })
      let output:any = ""
      output = await result.json()
      if (output.email === EmailAddress) {
        setAlertMessageBg("success")
        setAlertMessage("User Save Successfully")
        setShowSignupModal(false)
        setShowLoginModal(false)
        handleClick()
        setEmailAddress("")
        setPassword("")
        setUsernameGetting("")
        setConfirmPassword("")
        setShowLoginModal(true)
      } else {
        setAlertMessageBg("danger")
        setAlertMessage(output.message)
        handleClick()
      }
    } else {
      setAlertMessageBg("danger")
      setAlertMessage("Password didn't match with each other")
      handleClick()
    }
  }

  async function submitLoginForm(e: React.SyntheticEvent) {
    e.preventDefault()
    let profileImageName = ""
    let Username = ""
    let email = LoginEmailAddress
    let password = LoginPassword
    let data = { email, password, Username, profileImageName }
    let result = await fetch("http://127.0.0.1:5000/auth/signin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    let output:any = ""
    output = await result.json()
    if (output.email === LoginEmailAddress) {
      setAlertMessageBg("success")
      setAlertMessage("Login Successfully")
      setShowSignupModal(false)
      setShowLoginModal(false)
      handleClick()
      setLoginEmailAddress("")
      setLoginPassword("")
      dispatch(LoginDetailsSave(output.id, output.email, output.Username))
    } else {
      setAlertMessageBg("danger")
      setAlertMessage(output.message)
      handleClick()
    }
  }


  React.useEffect(() => {
    if (gettingUserDetails.length !== 0) {
      window.location.reload()
      router.push('/')
    }
  })

  return (
    <div style={{ overflow: "hidden" }}>
      <div>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} className={`text-white bg-${AlertMessageBg}`}>
            {AlertMessage}
          </Alert>
        </Snackbar>
      </div>
      <div className="row">
        <div className="col-xl-6 order-xl-2 formSide">
          <img src={HeaderLogoWhite.src} alt="#imgNotFound" width="50px" height="50px" className='authLogoRight' />
          <h1 className='pt-xl-5 pt-4 headingAuth'><b>Happening now</b></h1>
          <h1 className='pt-xl-5 pt-3'><b>Join Twitter today.</b></h1>
          <div style={{ width: "300px" }}>
            <div className="mt-3">
              <button type="button" className='py-2 signup_btns'>Sign up with google</button><br />
              <button type="button" className='py-2 signup_btns mt-3'><b>Sign up with Apple</b></button><br />
              <span style={{ color: "#EFF3F4" }}>---------------------</span> or <span style={{ color: "#EFF3F4" }}>---------------------</span><br />
              <button type="button" className="btn btn-primary mt-1" style={{ width: "300px", borderRadius: "20px" }} onClick={handleShowSignupModal}><b>Sign up with phone or email</b></button>
              <p style={{ fontSize: "12px" }}>By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
              <h5 className="mt-5">
                Already have an account?
              </h5>
              <button type="button" className='py-2 signup_btns text-primary mb-5' onClick={handleShowLoginModal}><b>Sign In</b></button><br />
            </div>
          </div>
        </div>
        <div className="col-xl-6 AuthLogoSide" style={{ background: "url(https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png)" }}>
          <img src={AuthLogo.src} alt="#imgNotFound" width="40%" height="40%" style={{ marginTop: "30%", marginLeft: "30%" }} />
        </div>
      </div>
      <ul className='text-center mt-2'>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>About</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Help Center</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Terms of Service</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Privacy Policy</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Cookie Policy</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Accessibility</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Ads info</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Blog</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Status</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Careers</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Brand Resources</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Advertising</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Marketing</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Twitter for Business</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Developers</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Directory</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>Settings</li>
        <li className='px-2' style={{ display: "inline", fontSize: "13px" }}>© 2022 Twitter, Inc.</li>
      </ul>

      <Modal
        show={showSignupModal}
        onHide={handleCloseSignupModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={HeaderLogoWhite.src} alt="#imgNotFound" width="50px" height="50px" style={{ marginLeft: "200px" }} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <h2><b>Sign up to Twitter</b></h2>
          <button type="button" className='py-2 signup_btns'>Sign up with google</button><br />
          <button type="button" className='py-2 signup_btns mt-3'><b>Sign up with Apple</b></button><br />
          <span className='py-5' style={{ color: "#EFF3F4" }}>---------------------</span> or <span style={{ color: "#EFF3F4" }}>---------------------</span><br />
          <form onSubmit={(e) => submitSignupForm(e)}>
            <TextField label="Email" id="filled-size-normal" type='email' style={{ width: "300px" }} value={EmailAddress} onChange={(e) => setEmailAddress(e.target.value)} required autoComplete='off' /><br />
            <TextField label="Username" className='mt-3' id="filled-size-normal" type='text' style={{ width: "300px" }} value={UsernameGetting} onChange={(e) => setUsernameGetting(e.target.value)} required autoComplete='off' /><br />
            <TextField label="Password" className='mt-3' type='password' id="filled-size-normal" style={{ width: "300px" }} value={Password} onChange={(e) => setPassword(e.target.value)} required autoComplete='off' /><br />
            <TextField label="Confirm Password" className='mt-3' type='password' id="filled-size-normal" style={{ width: "300px" }} value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required autoComplete='off' /><br />
            {/* <TextField className='mt-3' type='file' id="filled-size-normal" style={{ width: "300px" }} required onChange={(e) => setUploadProfilePhoto(e.target.files[0])} accept="image/png, image/gif, image/jpeg" /><br /> */}
            <input type="file" className='mt-3' style={{ width: "300px" }} required onChange={(e: any) => setUploadProfilePhoto(e.target.files[0])} accept="image/png, image/gif, image/jpeg" /><br />
            <button type="submit" className="btn btn-dark mt-3" style={{ width: "300px", borderRadius: "30px" }}>Sign Up</button><br />
          </form>
          <div className="my-5">
            <p>have an account? <span className='text-primary' style={{ cursor: "pointer" }} onClick={handleShowLoginModal}>Sign in</span></p>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={showLoginModal}
        onHide={handleCloseLoginModal}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <img src={HeaderLogoWhite.src} alt="#imgNotFound" width="50px" height="50px" style={{ marginLeft: "200px" }} />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <h2><b>Sign in to Twitter</b></h2>
          <button type="button" className='py-2 signup_btns'>Sign up with google</button><br />
          <button type="button" className='py-2 signup_btns mt-3'><b>Sign up with Apple</b></button><br />
          <span className='py-5' style={{ color: "#EFF3F4" }}>---------------------</span> or <span style={{ color: "#EFF3F4" }}>---------------------</span><br />
          <form onSubmit={(e) => submitLoginForm(e)}>
            <TextField label="Email" type="email" id="filled-size-normal" style={{ width: "300px" }} value={LoginEmailAddress} onChange={(e) => setLoginEmailAddress(e.target.value)} required autoComplete='off' /><br />
            <TextField className='mt-3' type="password" label="Password" id="filled-size-normal" style={{ width: "300px" }} value={LoginPassword} onChange={(e) => setLoginPassword(e.target.value)} required autoComplete='off' /><br />
            <button type="submit" className="btn btn-dark mt-3" style={{ width: "300px", borderRadius: "30px" }}>Sign In</button><br />
          </form>
          <button type="button" className='py-2 signup_btns mt-3'><b>Forgot Password?</b></button><br />
          <div className="my-5">
            <p>Don't have an account? <span className='text-primary' style={{ cursor: "pointer" }} onClick={handleShowSignupModal}>Sign up</span></p>
          </div>
        </Modal.Body>
      </Modal>
    </div >
  )
}

export default Auth;
