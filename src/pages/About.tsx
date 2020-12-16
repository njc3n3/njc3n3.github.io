import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { ThemeContext } from '..'
import { AboutContent } from '../components/about'
import { largeScreenMixin } from '../styles'

function LargeContainerStyles(spacing: string) {
  return css`
    flex-direction: row;
    .left-top {
      flex: 2;
      margin-right: ${spacing};
    }
    .right-bottom {
      flex: 1;
    }
  `
}
const Container = styled.div<{ spacing: string }>`
  display: flex;
  flex-direction: column;
  section {
    margin-bottom: ${({ spacing }) => spacing};
  }
  :last-child {
    margin-bottom: 0;
  }
  ${({ spacing }) => largeScreenMixin(LargeContainerStyles(spacing))}
`

export default function About() {
  const { mainSpacingRem } = useContext(ThemeContext)

  return (
    <Container spacing={mainSpacingRem}>
      <div className='left-top'>
        <AboutContent header='About Me'>
          I didn't take the typical path to becoming a software developer. As a kid I was always curious about how
          things were built and was good at math and science. I even 'dissected' an old computer in my bedroom, but in
          reality it was more of a demolition. After high school, I went to an engineering focused college in hopes of
          being a Civil Engineer, but quickly found it didn't interest me. I changed my focus to business because I've
          always liked math and my new department required me to take an Information Systems class. There I found my
          passion for computers and how they work. My first programming language was Java and I loved tinkering around
          and making little terminal applications. My Java skills grew further at my first two jobs, but my love for
          stopped. In my own time I tought myself JavaScript, HTML, and CSS building small sites and single-purpose
          applications. From there I learned React and TypeScript and that helped me land to my current job at Coolfire
          Solutions. Today, I enjoy the work that I do for Coolfire and am still learning new things outside of work.
        </AboutContent>
        <AboutContent header='Past Projects'>
          <h4>
            Workout Tracker -
            <a href='https://www.github.com/nickcoffey/tracker-native'>
              <i className='fas fa-external-link-alt'></i> Source Code
            </a>
          </h4>
          <ul>
            <li>
              There are many workout tracking and fitness applications on the market, but I wanted one that I could call
              my own.
            </li>
            <li>Building my own workout tracker also gave me an excuse to learn React Native and GraphQL.</li>
            <li>I decided to build my own Apollo backend for this project as well as a frontend using Expo.</li>
            <li>The application is simple, but it allows me to digitally track my progress instead of on paper.</li>
          </ul>
          <h4>
            This Site! -
            <a href='https://www.github.com/nickcoffey/nickcoffey.github.io'>
              <i className='fas fa-external-link-alt'></i> Source Code
            </a>
          </h4>
          <ul>
            <li>
              I wanted/needed a personal website to act as my portfolio and I figured it was the perfect opportunity to
              make my own without a website builder's help.
            </li>
            <li>
              This site is built with HTML and CSS compiled from Sass. I'm not quite a CSS guru, so I chose to learn a
              pre-processor during this project.
            </li>
          </ul>
          <h4>
            Project Tracker -
            <a href='https://www.github.com/nickcoffey/design'>
              <i className='fas fa-external-link-alt'></i> Source Code
            </a>
          </h4>
          <ul>
            <li>A custom web application built for a local waterproofing company to track project performance.</li>
            <li>
              The app estimates bid prices based on labor, material, and equipment cost inputs from the user. It also
              tracks the profitability of one or more jobs over any given range.
            </li>
            <li>It is built on a version of the MEAN stack: MySQL, ExpressJS, Angular 4, Node.js.</li>
            <li>An on-premises Ubuntu server hosts the entire application.</li>
          </ul>
        </AboutContent>
      </div>
      <div className='right-bottom'>
        <AboutContent header='Testing'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem repudiandae dolor harum unde vero explicabo
          aut porro, illo laboriosam molestiae minus? Sequi repellat natus facere amet impedit fugiat soluta itaque
          accusantium accusamus reprehenderit voluptas eveniet, quo fuga voluptatem quasi adipisci iure quibusdam nobis
          nulla sint error quaerat exercitationem! Hic voluptates iste rerum harum adipisci expedita? Velit delectus vel
          debitis quasi totam nisi, magnam iure nulla alias numquam cupiditate dolor dolores minus similique culpa ea
          optio natus adipisci quibusdam facere. Rem sapiente hic quae cumque aliquam animi voluptatem iste
          reprehenderit vel, fugiat perspiciatis ipsa maiores eligendi porro aut eius, sint doloribus!
        </AboutContent>
      </div>
    </Container>
  )
}
