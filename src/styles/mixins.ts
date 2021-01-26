import { css, FlattenSimpleInterpolation } from 'styled-components'
import { theme } from '.'

export function largeScreenMixin(innerCSS: FlattenSimpleInterpolation) {
  return css`
    @media only screen and (min-width: ${theme.minScreenWidth}) {
      ${innerCSS}
    }
  `
}

export function transitionMixin(property: string) {
  return css`
    transition-property: ${property};
    transition-duration: 0.18s;
    transition-timing-function: ease-in-out;
  `
}
