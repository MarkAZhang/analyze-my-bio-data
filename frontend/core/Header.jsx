import { Link } from 'react-router-dom'

import Section from './Section'
import cs from './header.css'

const Header = () => (
  <div className={cs.header}>
    <Section className={cs.inner}>
      <Link className={cs.logo} to='/'>
        Analyze My Bio Data
      </Link>
    </Section>
  </div>
)

export default Header
