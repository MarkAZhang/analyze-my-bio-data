// Loader automatically centers itself within enclosing container.
import cx from 'classnames'

import loaderGif from './loader.gif'
import cs from './styles.css'

type Props = {
  className?: string,
};

const Loader = (props: Props) => {
  const { className } = props

  return (
    <div className={cx(cs.loader, className)}>
      <img className={cs.loaderIcon} src={loaderGif} alt='loading icon' />
    </div>
  )
}

export default Loader
