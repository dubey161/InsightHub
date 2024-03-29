import { Button, Navbar, TextInput, Dropdown, Avatar } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
const Header = () => {
    const path = useLocation().pathname;
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const { quantity } = useSelector(state => state.cart);  // siginsuccess ka data yani abhi currentuse me data hai sigin ka jo authinacte hua hai backend authcontroller se;
    const { currentUser } = useSelector(state => state.user);
    const { theme } = useSelector(state => state.theme);
    const navigate = useNavigate();
    const [boolsignout, setboolsignout] = useState(false);
    const [toggle, toggleserach] = useState(true);
    const [notsearch, setnotsearch] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search])
    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data);
            } else {
                dispatch(signoutSuccess());
                setboolsignout(true);
                navigate('/');
            }
        } catch (error) {
            window.alert(error);
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    const handlesmall = () => {
        if (toggle) {
            navigate(`/search`);
            toggleserach(false);
            setnotsearch(false);
        } else {
            navigate('/');
            toggleserach(true);
            setnotsearch(true);
        }
    }
    return (
        <Navbar className='border-b-2'>
            <Link to="/" className='self-centre whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>InSightHub </span>
                Blog
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill onClick={handlesmall}>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2'>
                <Button className='w-12 h-10 sm:inline' color='gray' pill onClick={() => dispatch(toggleTheme())}>
                    {theme === 'light' ? <FaSun /> : <FaMoon />}
                </Button>
                {currentUser ? ( // if currentuser exit means first user signin then data send in currentuser
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt='user' img={currentUser.profilePicture}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>
                                {currentUser.email}
                            </span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in'>
                        <Button gradientDuoTone='purpleToBlue' outline className='font-sm ml-36 mt-1 md:ml-0 md:mt-0'>
                            Sign In
                        </Button>
                    </Link>

                )}
                <Navbar.Toggle />
                {boolsignout && (
                    <>
                        {window.alert('User signed out successfully')}
                        {setboolsignout(false)}
                    </>
                )}



            </div>
            {notsearch && <Navbar.Collapse>
                {/* path is used to make active it use useloaction; */}
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </Navbar.Link>
                {currentUser &&
                    <Navbar.Link active={path === '/Cart'} as={'div'}>
                        <Link to='/Cart'>
                            Cart
                            {quantity != 0 && <sup className='text-red-500 text-md'>{quantity}</sup>}
                        </Link>
                    </Navbar.Link>
                }
            </Navbar.Collapse>}
        </Navbar>
    )
}

export default Header