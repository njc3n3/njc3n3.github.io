import { useContext } from 'react'
import moment from 'moment'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '../hooks'
import { Content } from '../components/general'
import { StyledLink } from '../components'
import { ThemeContext } from '..'
import { largeScreenMixin } from '../styles'

export type PostType = {
  id: string
  titleImg: string
  title: string
  subtitle: string
  created: string
  updated: string
  content: { tag: string; text?: string; src?: string }[]
}

const LargeContainerStyles = css`
  grid-template-columns: repeat(3, 1fr);
`
const Container = styled.div<{ spacing: string }>`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ spacing }) => spacing};
  ${largeScreenMixin(LargeContainerStyles)}
`

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
`

const StyledImage = styled.img`
  width: 100%;
  display: block;
  
`

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
`

export default function Posts() {
  const { data, loading, error } = useQuery<{ posts: PostType[] }>('posts')
  const { mainSpacingRem, darkSubtitleText, darkText } = useContext(ThemeContext)

  let content = <></>
  if (error) {
    content = <h2>Error</h2>
  } else if (loading) {
    content = <h3>Loading...</h3>
  } else {
    content = (
      <Container spacing={mainSpacingRem}>
        {data?.posts.map(({ title, subtitle, titleImg, created, id }, index) => (
          <Content key={index}>
            <ImageContainer>
              <StyledImage src={titleImg} alt={title} />
            </ImageContainer>
            <Title>
              <h3 color={darkSubtitleText}>{title}</h3>
              <p>{moment(created).format('MMMM Do YYYY')}</p>
            </Title>
            <p style={{marginBottom: '0.5rem'}}>{subtitle}</p>
            <StyledLink to={`/posts/${id}`} color={darkSubtitleText} hover={darkText}>
              <h4>
                <FontAwesomeIcon icon={faBookOpen} /> Read
              </h4>
            </StyledLink>
          </Content>
        ))}
      </Container>
    )
  }

  return <>{content}</>
}
