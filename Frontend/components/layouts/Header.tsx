import Link from 'next/link'
import { useRouter } from 'next/router';
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import SearchIcon from '@mui/icons-material/Search';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import TopTweetWhite from '../../public/svgs/DarkThemeSvgs/TopTweetWhite.svg';
import TopTweetBlack from '../../public/svgs/LightThemeSvgs/TopTweetBlack.svg';
import HeaderLogoWhite from '../../public/svgs/DarkThemeSvgs/HeaderLogoWhite.svg';
import HeaderLogoBlack from '../../public/svgs/LightThemeSvgs/HeaderLogoBlack.svg';

interface Props {
    pageName: String;
    moreDetail: String
}

function Header({ pageName, moreDetail }: Props) {
    const router = useRouter()
    const goToBack = () => {
        router.back()
    }

    return (
        <div className="fixed-top myApp">
            <div className="container-md">
                <div className="row">
                    <div className="pt-4 col-sm-2 col-lg-1 col-xl-3 leftSidebarMenu px-xl-4">
                        <Link href="/">
                            <a style={{ textDecoration: "none", borderRadius: "100%" }} className='p-sm-3 menu_hover'>
                                <img src={HeaderLogoWhite.src} alt="#imgNotFound" width="30px" height="30px" style={{ marginTop: "-10px" }} className='LightScrnMenu' />
                                <img src={HeaderLogoBlack.src} alt="#imgNotFound" width="30px" height="30px" style={{ marginTop: "-10px" }} className='DarkScrnMenu' />
                            </a>
                        </Link>
                    </div>
                    <div className="p-0 m-0 col-12 col-sm-10 col-lg-7 col-xl-5 MainContent">
                        {moreDetail ?
                            <div className='pb-3 pb-sm-0 arrow_and_title'>
                                <div className="row">
                                    <div className="px-4 pt-1 mt-2 col-1" onClick={goToBack}>
                                        <KeyboardBackspaceIcon className='menu_hover' />
                                    </div>
                                    <div className="px-4 pt-2 pt-sm-0 col-10">
                                        <h5 className='pt-3 myApp' style={{ lineHeight: "0.1px" }}> {pageName}</h5>
                                        <span className='topHeading' style={{ fontSize: "12px" }}>{moreDetail}</span>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="px-sm-3 row">
                                <div className="col-6">
                                    <ListItem alignItems="flex-start" className='newTopHeading'>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" />
                                        </ListItemAvatar>
                                        <h5 style={{ paddingTop: "12px" }} className='myApp'><b>{pageName}</b></h5>
                                    </ListItem>
                                    <h5 className='pt-3 topHeading'> {pageName}</h5>
                                </div>
                                <div className="px-4 pt-4 pt-sm-3 col-6" style={{ textAlign: "right" }}>
                                    {moreDetail ?
                                        <></>
                                        :
                                        <>
                                            <img src={TopTweetWhite.src} alt="#imgNotFound" width="20px" height="20px" style={{ marginTop: "-10px" }} className='LightScrnMenu' />
                                            <img src={TopTweetBlack.src} alt="#imgNotFound" width="20px" height="20px" style={{ marginTop: "-10px" }} className='DarkScrnMenu' />
                                        </>
                                    }
                                </div>
                            </div>
                        }

                    </div>
                    <div className="px-4 col-lg-4 RightSidebarMenu">
                        <div className="px-1">
                            <div className='px-3 py-2 mt-2 mb-1 w-100 rightData' style={{ borderRadius: "30px", fontSize: "18px" }}>
                                <SearchIcon /><input type="text" placeholder='Search Twitter' className='textColor' style={{ marginLeft: "10px", width: "85%", background: "transparent", border: "0" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header


