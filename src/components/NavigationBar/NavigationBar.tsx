import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import nav from './NavigationBar.module.scss'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from 'next/router'

function NavigationBar() {
  const [hamburgerIcon, setHamburgerIcon] = useState<boolean>(false)
  const router = useRouter()
  const linkToPacks = () => {
    router.push('/icon-packs/icon-pack', undefined, { shallow: true })
  }
  const linkToUiIcons = () => {
    router.push('/ui-icons/ui-icon', undefined, { shallow: true })
  }
  return (
    <Navbar className={nav.navbar} expand='sm' sticky='top'>
      <Navbar.Brand className={nav.brand} href='/'>
        ZZ - icons
      </Navbar.Brand>
      <Navbar.Toggle className={nav.toggle} aria-controls='basic-navbar-nav'>
        {hamburgerIcon ? (
          <CloseIcon
            onClick={() => setHamburgerIcon(!hamburgerIcon)}
            className={nav.closeIcon}
          />
        ) : (
          <MenuIcon
            onClick={() => setHamburgerIcon(!hamburgerIcon)}
            className={nav.hamburgerIcon}
          />
        )}
      </Navbar.Toggle>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Nav.Link onClick={linkToPacks} className={nav.link}>
            Packs
          </Nav.Link>
          <Nav.Link onClick={linkToUiIcons} className={nav.link}>
            UIcons
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
