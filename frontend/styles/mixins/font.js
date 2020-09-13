const fontStyles = {
  default: {
    fontFamily: 'Source Serif Pro, serif',
    fontWeight: 400,
    fontSize: 20,
    lineHeight: 1.7,
  },
  heroTitle: {
    fontSize: 40,
    lineHeight: 1.3,
  },
  subtext: {
    fontSize: 24,
    lineHeight: 1.4,
  },
  heading: {
    fontSize: 40,
    fontWeight: 600,
    lineHeight: 1.3,
  },
  heading2: {
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 1.3,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 400,
    lineHeight: 1.3,
  },
  text: {
    fontSize: 28,
    fontWeight: 400,
  },
  text2: {
    fontSize: 18,
    fontWeight: 400,
  },
  text3: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.7,
  },
  text4: {
    fontSize: 11,
  },
  vizTooltip: {
    fontFamily: 'Source Sans Pro, sans-serif',
    fontWeight: 300,
    fontSize: 12,
  },
  logo: {
    fontSize: 20,
    fontWeight: 700,
  },
}

const font = (rule, type) => {
  if (!fontStyles[type]) throw rule.error(`Invalid font type: ${type}`)
  return fontStyles[type]
}

module.exports = font
