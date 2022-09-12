import * as React from "react";
import { Alert } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import Avatar from "@mui/material/Avatar";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ListItem from "@mui/material/ListItem";
import Snackbar from '@mui/material/Snackbar';
import Header from '../components/layouts/Header';
import ListItemText from "@mui/material/ListItemText";
import LikeIcon from '../public/svgs/LikeIcon.svg';
import UploadIcon from '../public/svgs/UploadIcon.svg';
import RetweetIcon from '../public/svgs/RetweetIcon.svg';
import CommentIcon from '../public/svgs/CommentIcon.svg'
import ListItemAvatar from "@mui/material/ListItemAvatar";
import UploadIconBottom from '../public/svgs/UploadIconBottom.svg';

function myProfile() {
  const router = useRouter()
  let userIdPass = router.query.userIdPass
  const [open, setOpen] = React.useState(false);
  const [TweetId, setTweetId] = React.useState("");
  const [UsernameDetails, setUsernameDetails] = React.useState(Object(""));
  const [loading, setloading] = React.useState(false);
  const [TweetData, setTweetData] = React.useState(Object(""));
  const [ModalData, setModalData] = React.useState(false);
  const [AlertMessage, setAlertMessage] = React.useState("");
  const [AlertMessageBg, setAlertMessageBg] = React.useState("");
  const [TweetReplyData, setTweetReplyData] = React.useState("");
  const handleShowCommentModal = () => setShowCommentModal(true);
  const [ModalUsername, setModalUsername] = React.useState(false);
  const handleCloseCommentModal = () => setShowCommentModal(false);
  const [showCommentModal, setShowCommentModal] = React.useState(false);
  const gettingUserDetails = useSelector((state:any) => state.ReduxCommands.LoginDetails);



  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  async function gettinguserTweetLength() {
    if (gettingUserDetails.length != 0) {
      await fetch(`http://127.0.0.1:5000/posts/user_profile/${gettingUserDetails[0].id}`)
        .then(response => response.json())
        .then(response => {
          setloading(true)
          setTweetData(response.reverse());
        })
        .catch(err => console.error(err));
    }
    else {
      router.push('/Auth')
    }
  }

  {
    React.useEffect(() => {
      gettinguserTweetLength()
    }, [])
  }

  function goToPostDetails(postIdPass: any) {
    window.localStorage.setItem('postIdPass', postIdPass);
    router.push({ pathname: '/PostDetails', 'query': { 'postIdPass': postIdPass } })
  }

  function modalOpenAndSetModalData(ModalIdGetting: any, ModalDataGetting: any, ModalUsernameGetting: any) {
    handleShowCommentModal()
    setTweetId(ModalIdGetting)
    setModalData(ModalDataGetting)
    setModalUsername(ModalUsernameGetting)
  }

  async function submitTweetReplyPostForm() {
    let userId = `${gettingUserDetails[0].id}`
    let commentData = TweetReplyData
    let postId = `${TweetId}`
    let data = { commentData, userId, postId }
    let result = await fetch(`http://127.0.0.1:5000/comment/add_comment/userId=${gettingUserDetails[0].id}/postId=${postId}`, {
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
      setAlertMessage("Tweet reply Successfully")
      setTweetReplyData("")
      handleCloseCommentModal()
      handleClick()
    } else {
      setAlertMessageBg("danger")
      setAlertMessage(output.message)
      handleClick()
    }
  }


  async function settingUsername() {
    if (gettingUserDetails.length != 0) {
      await fetch(`http://127.0.0.1:5000/auth/${gettingUserDetails[0].id}`)
        .then(response => response.json())
        .then(response => {
          setUsernameDetails(response);
          console.log(response)
        })
        .catch(err => console.error(err));
    }
    else {
      router.push('/Auth')
    }
  }

  {
    React.useEffect(() => {
      settingUsername()
    }, [])
  }


  return (
    <div>
      <Header pageName={UsernameDetails.Username} moreDetail={`${TweetData.length} Tweet`} />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} className={`text-white bg-${AlertMessageBg}`}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <div>
        <img src="https://pbs.twimg.com/profile_banners/15506669/1448361938/600x200" alt="#ImgNotFound" width="100%" style={{ maxHeight: "200px", height: "100%" }} />
        <img src={`http://localhost:5000/public/${UsernameDetails.profileImageName}`} alt="#ImgNotFound" className="mx-3" style={{ width: "150px", height: "150px", borderRadius: "100%", marginTop: "-90px", border: "5px solid white" }} />
        <div className="mx-3 mt-3 menu_and_follow_btn" style={{ float: "right" }}>
          <span>
            {/* <button type="button" className="btn edit_profile_btn">Edit Profile</button> */}
            <div className="mx-3 mt-3 menu_and_follow_btn" style={{ float: "right" }}>
              <span>
                <button type="button" className="btn edit_profile_btn">Edit Profile</button>
              </span>
            </div>
          </span>
        </div>
      </div>
      <div className="px-3 pt-3">
        <h5><b>@{UsernameDetails.Username}</b></h5>
      </div>
      <div className="p-0 m-0 mt-3 row">
        <p style={{ fontSize: "15px", cursor: "pointer" }} className="py-3 text-center col-3 profile_menu_hover profile_menu_active"><span style={{ borderBottom: "5px solid #1D9BF0" }} className="pb-2">Tweets</span></p>
        <p style={{ textDecoration: "none", fontSize: "15px", cursor: "pointer" }} className="py-3 text-center col-5 profile_menu_hover profile_menu">Tweets & replies</p>
        <p style={{ textDecoration: "none", fontSize: "15px", cursor: "pointer" }} className="py-3 text-center col-2 profile_menu_hover profile_menu">Media</p>
        <p style={{ textDecoration: "none", fontSize: "15px", cursor: "pointer" }} className="py-3 text-center col-2 profile_menu_hover profile_menu">Likes</p>
      </div>
      <div style={{ marginTop: "-12px" }}>
        {loading ?
          <>
            {
              TweetData.map((AllTweets: any) =>
                <div className='postDataHover borderBottom' style={{ cursor: "pointer" }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={AllTweets.user.Username} src={`http://localhost:5000/public/${AllTweets.user.profileImageName}`} />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <React.Fragment>
                          <>
                            <span style={{ fontSize: ".95rem" }}><span className='username'><b>{AllTweets.user.Username}</b></span></span><br />
                            <span className='postData w-100' onClick={() => goToPostDetails(AllTweets.id)}>
                              {AllTweets.postData}
                            </span>
                            <span className="py-2 row text-center" style={{ background: 'transparent' }}>
                              <span className="col textColor"><span onClick={() => modalOpenAndSetModalData(AllTweets.id, AllTweets.postData, AllTweets.user.Username)}><img src={CommentIcon.src} alt='#ImgNotFound' width="17px" height='17px' /></span></span>
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
        {/* <PostData />
        <PostDataWithImage />
        <PostData />
        <PostDataWithImage />
        <PostData />
        <PostDataWithImage />
        <PostData />
        <PostDataWithImage />
        <PostData />
        <PostDataWithImage />
        <PostData />
        <PostDataWithImage />
        <PostData />
        <PostDataWithImage />
        <PostData />
        <PostDataWithImage /> */}
      </div>

      <Modal show={showCommentModal} onHide={handleCloseCommentModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListItem alignItems="flex-start" className="p-0">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://media.istockphoto.com/photos/indian-flag-picture-id177387875?k=20&m=177387875&s=612x612&w=0&h=IHAO1FNk5eKA-OnZfRhSFRScopr7vDuKWUzfiA6ej34=" />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <React.Fragment>
                  <>
                    <span style={{ fontSize: "1rem" }}><span className='username'><b>{ModalUsername}</b></span></span><br />
                    <span className='postData w-100'>
                      {ModalData}<br /><br />
                      Replying to <span className="text-primary" style={{ cursor: "pointer" }}>@{ModalUsername} </span>
                    </span>
                  </>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start" className="p-0">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" sx={{ width: 50, height: 50 }} />
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
  )
}

export default myProfile
