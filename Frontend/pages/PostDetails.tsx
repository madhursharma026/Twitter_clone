import * as React from 'react';
import { useRouter } from 'next/router'
import Avatar from "@mui/material/Avatar";
import { useSelector } from 'react-redux';
import ListItem from "@mui/material/ListItem";
import Header from '../components/layouts/Header';
import LikeIcon from '../public/svgs/LikeIcon.svg';
import ListItemText from "@mui/material/ListItemText";
import UploadIcon from '../public/svgs/UploadIcon.svg';
import CommentIcon from '../public/svgs/CommentIcon.svg';
import RetweetIcon from '../public/svgs/RetweetIcon.svg';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import UploadIconBottom from '../public/svgs/UploadIconBottom.svg';


export default function PostDetails() {

    const router = useRouter()
    let postIdPass = router.query.postIdPass
    const [UserInfo, setUserInfo] = React.useState(Object(""));
    const [loading, setloading] = React.useState(false);
    const [AllTweets, setAllTweets] = React.useState(Object(""));
    const [AlertMessage, setAlertMessage] = React.useState("");
    const [AlertMessageBg, setAlertMessageBg] = React.useState("");
    const [TweetReplyData, setTweetReplyData] = React.useState("");
    const [TweetCommentDetails, setTweetCommentDetails] = React.useState(Object(""));
    const gettingUserDetails = useSelector((state: any) => state.ReduxCommands.LoginDetails);

    async function gettingTweetDetails() {
        await fetch(`http://127.0.0.1:5000/posts/${postIdPass}`)
            .then(response => response.json())
            .then(response => {
                setloading(true)
                setAllTweets(response);
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
                })
                .catch(err => console.error(err));
        }
        else {
            router.push('/Auth')
        }
    }

    {
        React.useEffect(() => {
            gettingTweetDetails()
            gettingUserInfo()
            postIdPass = JSON.parse(window.localStorage.getItem('postIdPass') as any)
        }, [])
    }

    async function gettingTweetCommentDetails() {
        await fetch(`http://127.0.0.1:5000/comment/post_detail/${postIdPass}`)
            .then(response => response.json())
            .then(response => {
                setTweetCommentDetails(response.reverse());
            })
            .catch(err => console.error(err));
    }

    {
        React.useEffect(() => {
            gettingTweetCommentDetails()
        }, [])
    }

    async function submitTweetReplyPostForm() {
        let userId = `${gettingUserDetails[0].id}`
        let commentData = TweetReplyData
        let postId = `${postIdPass}`
        let data = { commentData, userId, postId }
        let result = await fetch(`http://127.0.0.1:5000/comment/add_comment/userId=${userId}/postId=${postId}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        let output:any = ""
        output = await result.json()
        // result = await result.json()
        if (output.commentData === TweetReplyData) {
            setAlertMessageBg("success")
            setAlertMessage("Tweet Successfully")
            setTweetReplyData("")
            gettingTweetCommentDetails()
        } else {
            setAlertMessageBg("danger")
            setAlertMessage(output.message)
        }
    }

    function goToProfile(userIdPass: any) {
        if (userIdPass === gettingUserDetails[0].id) {
            router.push('/myProfile')
        } else {
            window.localStorage.setItem('userIdPass', userIdPass);
            router.push({ pathname: '/profile', 'query': { 'userIdPass': userIdPass } })
        }
    }


    return (
        <div className='px-3'>
            <Header pageName="Tweet" moreDetail="" />
            {loading ?
                <>
                    <ListItem alignItems="flex-start" className='px-0 mx-0'>
                        <ListItemAvatar>
                            <Avatar alt={AllTweets.user.Username} src={`http://localhost:5000/public/${AllTweets.user.profileImageName}`} sx={{ width: 50, height: 50 }} />
                        </ListItemAvatar>
                        <h6 className='mt-2 myApp' style={{ background: 'transparent' }}><b>{AllTweets.user.Username}</b><br /><span style={{ color: "rgb(83, 100, 113)" }}>@{AllTweets.user.Username}</span></h6>
                    </ListItem>
                    <h4 className='borderBottom pb-3'>{AllTweets.postData}</h4>
                    <ListItem alignItems="flex-start" className='borderBottom'>
                        <ListItemAvatar>
                            <Avatar alt={UserInfo.Username} src={`http://localhost:5000/public/${UserInfo.profileImageName}`} sx={{ width: 50, height: 50 }} />
                        </ListItemAvatar>
                        <ListItemText
                            secondary={
                                <React.Fragment>
                                    {/* <input type="text" placeholder="What's happening?" className="p-2 w-100 mt-2" style={{ fontSize: "20px", height: "50px", border: "0", background:"transparent" }} /> */}
                                    <textarea style={{ width: "80%", fontSize: "20px", height: "50px", border: "0", background: "transparent" }} className="p-2 mt-2" placeholder="Tweet your reply" value={TweetReplyData} onChange={(e) => setTweetReplyData(e.target.value)} required autoComplete='off'></textarea>
                                    <button type="button" className="btn btn-primary" style={{ borderRadius: "30px", marginTop: "-45px", marginLeft: "10px" }} onClick={() => submitTweetReplyPostForm()}><b>Tweet</b></button>
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <>
                        {
                            TweetCommentDetails.map((TweetCommentDetails: any) =>
                                <div className='postDataHover borderBottom' style={{ cursor: "pointer" }}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt={TweetCommentDetails.user.Username} src={`http://localhost:5000/public/${TweetCommentDetails.user.profileImageName}`} sx={{ width: 50, height: 50 }} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            secondary={
                                                <React.Fragment>
                                                    <>
                                                        <span style={{ fontSize: ".95rem" }} onClick={() => goToProfile(TweetCommentDetails.user.id)}><span className='username'><b>{TweetCommentDetails.user.Username}</b></span></span><br />
                                                        <span className='postData w-100'>
                                                            {TweetCommentDetails.commentData}
                                                        </span>
                                                        <span className="py-2 row text-center" style={{ background: 'transparent' }}>
                                                            <span className="col textColor"><span><img src={CommentIcon.src} alt='#ImgNotFound' width="17px" height='17px' /></span></span>
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
                </>
                :
                <div className="text-center mt-5" style={{ overflow: "hidden" }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            }
        </div >
    )
}

