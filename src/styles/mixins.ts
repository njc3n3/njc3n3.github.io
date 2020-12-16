import { css, FlattenSimpleInterpolation } from 'styled-components'
import { theme } from '.'

export function largeScreenMixin(innerCSS: FlattenSimpleInterpolation) {
  return css`
    @media only screen and (min-width: ${theme.minScreenWidth}) {
      ${innerCSS}
    }
  `
}
