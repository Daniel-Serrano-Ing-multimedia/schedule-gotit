import React, { useEffect, useState } from 'react';
// next
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
//material ui 
import { Grid, Menu, MenuItem, IconButton, Button } from '@material-ui/core';
import { MoreVertOutlined, DeleteOutline } from '@material-ui/icons';

// context
import useUser from '../../context/hooks/useUser';
// images
import logo from '../../public/Gotit Horizontal.png'
// styles
import styled from 'styled-components';
import device from '../../styles/styledBreakPoints';

const SyledHeader = styled(Grid)`
  display: flex;
	background-color: #e2e2e2;
	text-transform: uppercase;
  height: 5rem !important;
`;

const StyledLogo = styled(Grid)`
 @import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,600&family=Staatliches&display=swap');
  display: flex;
	:hover{
    cursor: pointer;
	} 
  div {
    &:first-child {
      height: ${ 70 }px;
      width: ${ 70*( 688/283 ) }px;
      min-height: ${ 70 }px;
      min-width: ${ 70*( 688/283 ) }px;
		}
	}
  h1{
    padding-left: 2rem;
    font-family: 'Kanit', sans-serif;
    transform: scaleX(0.55) scaleY(1.8);
    font-weight: bolder;
    transform-origin: left;
    width: 2rem;
  }
`;

const StyledDesktopMenu = styled(Grid)`
	margin-top: 20px;
	margin-right: 20px;
	list-style: none;
  display: none !important;
  @media ${ device.md } {
    display: flex !important;
  }
	>li {
		float: right;
		position: relative;
		border-right: 3px solid #e2e2e2;
		perspective: 1000px;
		&:first-child {
			border-left: 1px solid #e2e2e2;
		}
		&:hover {
			>a {
				color: $primary;
				text-shadow: none;
			}
		}
	}
	a {
		z-index: 10;
		padding: 13px 30px 13px 13px;
		text-decoration: none;
		color: rgba(75,75,75,1);
		line-height: 1;
		font-weight: 600;
		font-size: 18px;
	}

`;

const StyledMobileMenu = styled(Grid)`
  @media ${ device.md }{
    display: none;
  }
`;

const Header = () => {
  // User context 
  const userContext = useUser();
  const { state : useState, isAuthenticated ,logout } = userContext;
  const  { isAuth, user } = useState;
  // next routing 
  const router = useRouter();
  // useEffect
  useEffect( ()=>{
    if( !isAuth ){
      isAuthenticated();
      if( !isAuth ){
        router.push( '/login' )
      }
    }
  }, [ useState ])

  const log_out = () =>{
    router.push({
      pathname : '/login',
    })
    logout();
  }

  const goToIndex = () => {
    router.push({
      pathname : '/',
      query : { company : user.company }
    });
  }
  
  /// Menu Mobile

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (  
    <SyledHeader 
      container
      justifyContent = 'space-between'
      alignItems = 'center'
    >
      <StyledLogo 
        container
        alignItems = 'center'
        item
        xs = { 9 } sm ={ 7 } md = { 3 }
      >
          <Image 
            id= 'logo' 
            src={ logo } 
            onClick = { () => goToIndex() }
          />
        <h1>Soporte</h1>
      </StyledLogo>
        <StyledDesktopMenu 
          container
          item 
          md ={ 8 }  
          direction = 'row-reverse'
        >
            <NavMenu 
              user = { user }
              log_out = { log_out }
            />
        </StyledDesktopMenu>

        <StyledMobileMenu item  xs = { 2 } sm = { 1 }>
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MoreVertOutlined/>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <NavMenu 
              user = { user }
              log_out = { log_out }
            />
          </Menu>
      </StyledMobileMenu>       
    </SyledHeader>
  );
}
 
export default Header;

const NavMenu = ({ user, log_out }) =>
  <>
    <li>
      <a onClick ={ log_out } href="#">Cerrar Sesión</a>
    </li>
      { !user?.role || user.role === 'admin'?
        <li>
          <Link 
            href = {{
              pathname : '/new-req',
              query :{ company : user?.company }
            }}
            >
            <a>Nuevo requerimiento</a>
          </Link>
        </li>
        : null
      }
    <li>
      <Link 
        href = {{
          pathname : '/',
          query :{ company : user?.company }
        }}
      >
        <a>Proyectos</a>
      </Link>
    </li> 
  </>