import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { BsFacebook, BsInstagram, BsGithub, BsDribbble, BsLinkedin } from "react-icons/bs";
const FooterComp = () => {
    return (
        <Footer container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link to="/" className='self-centre whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>InSightHub </span>
                            Blog
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-8 mt-4 sm:grig-cols-3 sm:gap-6'>
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://github.com/dubey161' target='_blank' rel='noopener noreferrer'>
                                    100 JS Projects
                                </Footer.Link>

                                <Footer.Link href='https://github.com/dubey161' target='_blank' rel='noopener noreferrer'>
                                    InSightHub Blog
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>

                        <div>
                            <Footer.Title title='FOLLOW US' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='https://github.com/dubey161' target='_blank' rel='noopener noreferrer'>
                                    Github
                                </Footer.Link>

                                <Footer.Link href='https://github.com/dubey161' target='_blank' rel='noopener noreferrer'>
                                    Discord
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>

                        <div>
                            <Footer.Title title='LEGAL' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='#' rel='noopener noreferrer'>
                                    Privacy Policy
                                </Footer.Link>

                                <Footer.Link href='#' rel='noopener noreferrer'>
                                    Terms &amp; Conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>

                    </div>
                </div>
                <Footer.Divider />
                <div className='w-full sm:flex sm:items-centre sm:justify-between'>
                    <Footer.Copyright href='#' by="Ved InSightHub Group" year={new Date().getFullYear()} />
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-centre'>
                        <Footer.Icon href='#' target='_blank' icon={BsFacebook} />
                        <Footer.Icon href='https://www.instagram.com/ved_528/' target='_blank' icon={BsInstagram} />
                        <Footer.Icon href='https://github.com/dubey161' target='_blank' icon={BsGithub} />
                        <Footer.Icon href='https://github.com/dubey161' target='_blank' icon={BsDribbble} />
                        <Footer.Icon href='https://www.linkedin.com/in/ved-prakash-dubey-696b68215/' target='_blank' icon={BsLinkedin} />
                    </div>
                </div>
            </div>
        </Footer>
    )
}

export default FooterComp