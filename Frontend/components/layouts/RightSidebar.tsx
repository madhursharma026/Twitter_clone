import Link from 'next/link';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export default function RightSidebar() {

    return (
        <div className='mx-3'>
            <div className="mt-3 card rightData" style={{ borderRadius: "20px", border: "0" }}>
                <div className="card-body">
                    <h5 className='textColor px-2' style={{ fontFamily: "inherit" }}>
                        <b>What’s happening</b>
                    </h5>
                    <li className="p-2 ads row" style={{ listStyleType: 'none' }}>
                        <div className="col-8 col-xl-9">
                            <p style={{ fontSize: "14px" }}>News · 2 hours ago</p>
                            <h6 style={{ marginTop: "-17px", fontSize: "15px" }}>Reviews are in for Aamir Khan's Laal Singh Chaddha 🎬</h6>
                            <span style={{ fontSize: "13px" }}>
                                Trending with <Link href="/">
                                    <a>#AamirKhan</a>
                                </Link>
                            </span>
                        </div>
                        <div className="col-4 col-xl-3">
                            <img src="https://images.news18.com/ibnlive/uploads/2022/08/laal-singh-1-16602097373x2.jpg" alt="#ImgNotFound" className='w-100' style={{ height: '70px', borderRadius: "15px" }} />
                        </div>
                    </li>
                    <li className="p-2 ads row" style={{ listStyleType: 'none' }}>
                        <p style={{ fontSize: "14px" }}>Raksha Bandhan 2022 · LIVE</p>
                        <h6 style={{ marginTop: "-17px", fontSize: "14px" }}>Happy Raksha Bandhan 🎊</h6>
                        <span style={{ fontSize: "15px" }}>
                            Trending with <Link href="/">
                                <a>#Rakhi</a>
                            </Link>
                        </span>
                    </li>
                    <li className="p-2 ads row" style={{ listStyleType: 'none' }}>
                        <div className="col-8 col-xl-9">
                            <p style={{ fontSize: "14px" }}>News · 2 hours ago</p>
                            <h6 style={{ marginTop: "-17px", fontSize: "15px" }}>Reviews are in for Aamir Khan's Laal Singh Chaddha 🎬</h6>
                            <span style={{ fontSize: "13px" }}>
                                Trending with <Link href="/">
                                    <a>#AamirKhan</a>
                                </Link>
                            </span>
                        </div>
                        <div className="col-4 col-xl-3">
                            <img src="https://images.news18.com/ibnlive/uploads/2022/08/laal-singh-1-16602097373x2.jpg" alt="#ImgNotFound" className='w-100' style={{ height: '70px', borderRadius: "15px" }} />
                        </div>
                    </li>
                    <li className="p-2 ads row" style={{ listStyleType: 'none' }}>
                        <p style={{ fontSize: "14px" }}>Raksha Bandhan 2022 · LIVE</p>
                        <h6 style={{ marginTop: "-17px", fontSize: "14px" }}>Happy Raksha Bandhan 🎊</h6>
                        <span style={{ fontSize: "15px" }}>
                            Trending with <Link href="/">
                                <a>#Rakhi</a>
                            </Link>
                        </span>
                    </li>
                    <li className="p-2 ads row" style={{ listStyleType: 'none' }}>
                        <p style={{ fontSize: "14px" }}>Raksha Bandhan 2022 · LIVE</p>
                        <h6 style={{ marginTop: "-17px", fontSize: "14px" }}>Happy Raksha Bandhan 🎊</h6>
                        <span style={{ fontSize: "15px" }}>
                            Trending with <Link href="/">
                                <a>#Rakhi</a>
                            </Link>
                        </span>
                    </li>
                    <li className="p-2 ads" style={{ listStyleType: 'none' }}>
                        <Link href="#seeMore">
                            <a style={{ textDecoration: "none" }}>
                                See More
                            </a>
                        </Link>
                    </li>
                </div>
            </div>

            <div className="mt-3 card rightData" style={{ borderRadius: "20px", border: "0" }}>
                <div className="card-body">
                    <h5 className='textColor px-2' style={{ fontFamily: "inherit" }}>
                        <b>Who to follow</b>
                    </h5>
                    <ListItem alignItems="flex-start" className='mx-0 px-0'>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" sx={{ width: 45, height: 45 }} />
                        </ListItemAvatar>
                        <h6 className='myApp mt-2' style={{ background: 'transparent' }}><b>Rahul Gandhi</b><br /><span style={{ color: "rgb(83, 100, 113)" }}>@RahulGandhi</span></h6>
                    </ListItem>
                    <ListItem alignItems="flex-start" className='mx-0 px-0'>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" sx={{ width: 45, height: 45 }} />
                        </ListItemAvatar>
                        <h6 className='myApp mt-2' style={{ background: 'transparent' }}><b>Rahul Gandhi</b><br /><span style={{ color: "rgb(83, 100, 113)" }}>@RahulGandhi</span></h6>
                    </ListItem>
                    <ListItem alignItems="flex-start" className='mx-0 px-0'>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745" sx={{ width: 45, height: 45 }} />
                        </ListItemAvatar>
                        <h6 className='myApp mt-2' style={{ background: 'transparent' }}><b>Rahul Gandhi</b><br /><span style={{ color: "rgb(83, 100, 113)" }}>@RahulGandhi</span></h6>
                    </ListItem>
                    <li className="p-2 ads" style={{ listStyleType: 'none' }}>
                        <Link href="#seeMore">
                            <a style={{ textDecoration: "none" }}>
                                See More
                            </a>
                        </Link>
                    </li>
                </div>
            </div>

            <ul style={{ listStyleType: 'none' }} className="px-3">
                <li style={{display:"inline", fontSize:"14px", cursor:"pointer"}} className="right_side_footer">Terms of Service</li>
                <li style={{display:"inline", fontSize:"14px", cursor:"pointer"}} className="right_side_footer">&ensp;Privacy Policy</li>
                <li style={{display:"inline", fontSize:"14px", cursor:"pointer"}} className="right_side_footer">&ensp;Cookie Policy</li>
                <li style={{display:"inline", fontSize:"14px", cursor:"pointer"}} className="right_side_footer">&ensp;Accessibility</li>
                <li style={{display:"inline", fontSize:"14px", cursor:"pointer"}} className="right_side_footer">&ensp;Ads info</li>
                <li style={{display:"inline", fontSize:"14px", cursor:"pointer"}} className="right_side_footer">&ensp;More</li>
                <li style={{fontSize:"14px", cursor:"pointer"}}>© 2022 Twitter, Inc.</li>
            </ul>
        </div>
    )
}

