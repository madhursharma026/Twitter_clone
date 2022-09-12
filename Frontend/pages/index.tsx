import * as React from "react";
import type { NextPage } from 'next'
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import Avatar from "@mui/material/Avatar";
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListItem from "@mui/material/ListItem";
import Snackbar from '@mui/material/Snackbar';
import Header from '../components/layouts/Header';
import LikeIcon from '../public/svgs/LikeIcon.svg';
import ListItemText from "@mui/material/ListItemText";
import UploadIcon from '../public/svgs/UploadIcon.svg';
import RetweetIcon from '../public/svgs/RetweetIcon.svg';
import CommentIcon from '../public/svgs/CommentIcon.svg';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import UploadIconBottom from '../public/svgs/UploadIconBottom.svg';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';

const Home: NextPage = () => {
  const router = useRouter()
  const handleShowCommentModal = () => setShowCommentModal(true);
  const handleCloseCommentModal = () => setShowCommentModal(false);
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [TweetId, setTweetId] = React.useState("");
  const [UserInfo, setUserInfo] = React.useState(Object(""));
  const [loading, setloading] = React.useState(false);
  const [TweetData, setTweetData] = React.useState("");
  const [AllTweets, setAllTweets] = React.useState(Object([]));
  const [ModalData, setModalData] = React.useState(false);
  const [ModalUsername, setModalUsername] = React.useState(false);
  const [AlertMessage, setAlertMessage] = React.useState("");
  const [AlertMessageBg, setAlertMessageBg] = React.useState("");
  const [TweetReplyData, setTweetReplyData] = React.useState("");
  const [ProfileNameGetting, setProfileNameGetting] = React.useState("");
  const gettingUserDetails = useSelector((state: any) => state.ReduxCommands.LoginDetails);

  React.useEffect(() => {
    if (gettingUserDetails.length === 0) {
      router.push('/Auth')
    }
  })

  async function gettingAllTweets() {
    await fetch(`http://127.0.0.1:5000/posts`)
      .then(response => response.json())
      .then(response => {
        setloading(true)
        setAllTweets(response.reverse());
      })
      .catch(err => console.error(err));
  }

  async function gettingUserInfo() {
    if (gettingUserDetails.length != 0) {
      await fetch(`http://127.0.0.1:5000/auth/${gettingUserDetails[0].id}`)
        .then(response => response.json())
        .then(response => {
          setloading(true)
          setUserInfo(response);
          console.log(response);
        })
        .catch(err => console.error(err));
    }
    else {
      router.push('/Auth')
    }
  }

  {
    React.useEffect(() => {
      gettingAllTweets()
      gettingUserInfo()
    }, [])
  }


  function goToProfile(userIdPass: any) {
    if (userIdPass === gettingUserDetails[0].id) {
      router.push('/myProfile')
    } else {
      window.localStorage.setItem('userIdPass', userIdPass);
      router.push({ pathname: '/profile', 'query': { 'userIdPass': userIdPass } })
    }
  }
  function goToPostDetails(postIdPass: any) {
    window.localStorage.setItem('postIdPass', postIdPass);
    router.push({ pathname: '/PostDetails', 'query': { 'postIdPass': postIdPass } })
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

  async function submitTweetPostForm(e: React.SyntheticEvent) {
    e.preventDefault()
    let userId = `${gettingUserDetails[0].id}`
    let postData = TweetData
    let data = { postData, userId }
    let result = await fetch(`http://127.0.0.1:5000/posts/add_posts/userId=${userId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    // result = await result.json()    
    let output:any = ""
    output = await result.json()
    if (output.postData === TweetData) {
      setAlertMessageBg("success")
      setAlertMessage("Tweet Successfully")
      setTweetData("")
      gettingAllTweets()
      handleClick()
    } else {
      setAlertMessageBg("danger")
      setAlertMessage(output.message)
      handleClick()
    }
  }

  function modalOpenAndSetModalData(ModalIdGetting: any, ModalDataGetting: any, ModalUsernameGetting: any, ModalProfileNameGetting: any) {
    handleShowCommentModal()
    setTweetId(ModalIdGetting)
    setModalData(ModalDataGetting)
    setModalUsername(ModalUsernameGetting)
    setProfileNameGetting(ModalProfileNameGetting)
  }

  async function submitTweetReplyPostForm() {
    let userId = `${gettingUserDetails[0].id}`
    let commentData = TweetReplyData
    let postId = `${TweetId}`
    let data = { commentData, userId, postId }
    let result = await fetch(`http://127.0.0.1:5000/comment/add_comment/userId=${userId}/postId=${postId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    // result = await result.json() 
    let output:any = ""
    output = await result.json()
    if (output.commentData === TweetReplyData) {
      setAlertMessageBg("success")
      setAlertMessage("Tweet Successfully")
      setTweetReplyData("")
      handleCloseCommentModal()
      handleClick()
    } else {
      setAlertMessageBg("danger")
      setAlertMessage(output.message)
      handleClick()
    }
  }

  return (
    <>
      <Header pageName="Home" moreDetail="" />
      <div className="inputTweetBeforeSMScrn borderBottom">
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} className={`text-white bg-${AlertMessageBg}`}>
            {AlertMessage}
          </Alert>
        </Snackbar>
        <form onSubmit={(e) => submitTweetPostForm(e)}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={UserInfo.Username} src={`http://localhost:5000/public/${UserInfo.profileImageName}`} sx={{ width: 50, height: 50 }} />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <React.Fragment>
                  <textarea className="p-2 w-100 mt-2" style={{ width: "100%", fontSize: "20px", height: "50px", border: "0", background: "transparent" }} placeholder="What's happening?" value={TweetData} onChange={(e) => setTweetData(e.target.value)} required autoComplete='off'></textarea>
                </React.Fragment>
              }
            />
          </ListItem>
          <div className="mb-2 row">
            <div className="col-6 row px-5">
              <div className="col-2">
                <InsertPhotoOutlinedIcon style={{ fontSize: "20px", color: "#36A7F2" }} />
              </div>
              <div className="col-2">
                <GifBoxOutlinedIcon style={{ fontSize: "20px", color: "#36A7F2" }} />
              </div>
              <div className="col-2">
                <PollOutlinedIcon style={{ fontSize: "20px", color: "#36A7F2" }} />
              </div>
              <div className="col-2">
                <SentimentSatisfiedAltOutlinedIcon style={{ fontSize: "20px", color: "#36A7F2" }} />
              </div>
              <div className="col-2">
                <EventRepeatOutlinedIcon style={{ fontSize: "20px", color: "#36A7F2" }} />
              </div>
              <div className="col-2">
                <PlaceOutlinedIcon style={{ fontSize: "20px", color: "#9CD3F8" }} />
              </div>
            </div>
            <div className="col-6" style={{ textAlign: "right" }}>
              <button type="submit" className={`btn btn-primary ${(TweetData.length === 0) ? "disabled" : ""}`} style={{ borderRadius: "30px" }}><b>Tweet</b></button>
            </div>
          </div>
        </form>
      </div>
      <div className="pt-3 pt-sm-0">
        {loading ?
          <>
            {
              AllTweets.map((AllTweets: any) =>
                <div className='postDataHover borderBottom' style={{ cursor: "pointer" }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={AllTweets.user.Username} src={`http://localhost:5000/public/${AllTweets.user.profileImageName}`} />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <>
                            <span style={{ fontSize: ".95rem" }} onClick={() => goToProfile(AllTweets.user.id)}><span className='username'><b>{AllTweets.user.Username}</b></span></span><br />
                            <span className='postData w-100' onClick={() => goToPostDetails(AllTweets.id)}>
                              {AllTweets.postData}
                            </span>
                            <span className="py-2 row text-center" style={{ background: 'transparent' }}>
                              <span className="col textColor"><span onClick={() => modalOpenAndSetModalData(AllTweets.id, AllTweets.postData, AllTweets.user.Username, AllTweets.user.profileImageName)}><img src={CommentIcon.src} alt='#ImgNotFound' width="17px" height='17px' /></span></span>
                              <span className="col textColor"><img src={RetweetIcon.src} alt='#ImgNotFound' width="17px" height='17px' /></span>
                              <span className="col textColor"><img src={LikeIcon.src} alt='#ImgNotFound' width="17px" height='17px' /></span>
                              <span className="col textColor"><img src={UploadIcon.src} alt='#ImgNotFound' width="17px" height='17px' /><img src={UploadIconBottom.src} alt='#ImgNotFound' width="20px" height='20px' style={{ marginLeft: "-19px" }} /></span>
                            </span>
                          </>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </div>
              )
            }
          </>
          :
          <div className="text-center mt-5" style={{ overflow: "hidden" }}>
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        }

        <Modal show={showCommentModal} onHide={handleCloseCommentModal} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListItem alignItems="flex-start" className="p-0">
              <ListItemAvatar>
                <Avatar alt={`${ModalUsername}`} src={`http://localhost:5000/public/${ProfileNameGetting}`} />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <>
                      <span style={{ fontSize: "1rem" }}><span className='username'><b>{ModalUsername}</b></span></span><br />
                      <span className='postData w-100'>
                        {ModalData}<br /><br />
                        Replying to <span className="text-primary" onClick={goToProfile} style={{ cursor: "pointer" }}>@{ModalUsername} </span>
                      </span>
                    </>
                  </React.Fragment>
                }
              />
            </ListItem>
            <ListItem alignItems="flex-start" className="p-0">
              <ListItemAvatar>
                <Avatar alt={UserInfo.Username} src={`http://localhost:5000/public/${UserInfo.profileImageName}`} sx={{ width: 50, height: 50 }} />
              </ListItemAvatar>
              <ListItemText
                secondary={
                  <React.Fragment>
                    {/* <input type="text" placeholder="What's happening?" className="p-2 w-100 mt-2" style={{ fontSize: "20px", height: "50px", border: "0", background:"transparent" }} /> */}
                    <textarea className="p-2 w-100 mt-2" style={{ width: "100%", fontSize: "20px", height: "50px", border: "0", background: "transparent" }} placeholder="Tweet your reply" value={TweetReplyData} onChange={(e) => setTweetReplyData(e.target.value)} required autoComplete='off'></textarea>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className={`${(TweetReplyData.length === 0) ? 'disabled' : ''}`} onClick={() => submitTweetReplyPostForm()}>
              Reply
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default Home

