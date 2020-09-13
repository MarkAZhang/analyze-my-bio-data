import cx from 'classnames'

import cs from '~/styles/font.css'

type Props = {
  glyph: string,
  onClick?: () => void,
  className?: string,
}

const Icon = (props: Props) => {
  const { className, glyph, onClick } = props

  return (
    <i
      className={cx(cs[`icon-${glyph}`], className)}
      name={glyph}
      onClick={onClick}
    />
  )
}

export default Icon
