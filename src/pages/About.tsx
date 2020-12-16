import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import styled, { css } from 'styled-components'
import { ThemeContext } from '..'
import { AboutContent, AboutList, ContactMe } from '../components/about'
import { Link } from '../components/general'
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

const RepoLink = ({ repo }: { repo: string }) => (
  <Link href={`https://www.github.com/nickcoffey/${repo}`}>
    <FontAwesomeIcon icon={faExternalLinkAlt} /> Source Code
  </Link>
)

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
          <AboutList
            header='Workout Tracker'
            subheader={<RepoLink repo='tracker-native' />}
            items={[
              'There are many workout tracking and fitness applications on the market, but I wanted one that I could call my own.',
              'Building my own workout tracker also gave me an excuse to learn React Native and GraphQL.',
              'I decided to build my own Apollo backend for this project as well as a frontend using Expo.',
              'The application is simple, but it allows me to digitally track my progress instead of on paper.'
            ]}
          />
          <AboutList
            header='This Site!'
            subheader={<RepoLink repo='nickcoffey.github.io' />}
            items={[
              "I wanted/needed a personal website to act as my portfolio and I figured it was the perfect opportunity to make my own without a website builder's help.",
              "This site is built with HTML and CSS compiled from Sass. I'm not quite a CSS guru, so I chose to learn a pre-processor during this project."
            ]}
          />
          <AboutList
            header='Project Tracker'
            subheader={<RepoLink repo='design' />}
            items={[
              'A custom web application built for a local waterproofing company to track project performance.',
              'The app estimates bid prices based on labor, material, and equipment cost inputs from the user. It also tracks the profitability of one or more jobs over any given range.',
              'It is built on a version of the MEAN stack: MySQL, ExpressJS, Angular 4, Node.js.',
              'An on-premises Ubuntu server hosts the entire application.'
            ]}
          />
        </AboutContent>
        <AboutContent header='Work Experience'>
          <AboutList
            header='Frontend Engineer'
            subheader='Coolfire Solutions (2020 - Present)'
            items={[
              'Work on the frontend team developing three main web applications.',
              'The apps are being built with TypeScript React. Two of them are using the Next.js framework.',
              'All testing is done in-house by the dev team with support unit tests and integration tests written in Cypress.'
            ]}
          />
          <AboutList
            header='Advanced Technologies Developer'
            subheader='AAA (2018 - 2020)'
            items={[
              'Helped develop and fix business logic in proprietary frameworks called PolicyCenter and BillingCenter which are built on a JVM language named GoSu.',
              'Worked on a team of teams under the LeSS Agile framework supporting the core insurance business application.',
              'Our Jenkins server built and deployed code to a number of different environments using my custom Jenkins pipelines.'
            ]}
          />
          <AboutList
            header='Business Analyst'
            subheader='Charter Communications (2017 - 2018)'
            items={[
              'Worked on the E-Commerce team supporting the application that helps users purchase and customize their cable service.',
              'One of my main roles was to write and maintain Jenkins deployment scripts. The scripts were run weekly and were tested with REST API tests that I made in SoapUI.',
              'My other main task was to build reports for displaying sales based on factors such as location and cable package. The data was sourced and cleaned with Alteryx and the visualizations were made with Tableau.'
            ]}
          />
        </AboutContent>
      </div>
      <div className='right-bottom'>
        <AboutContent header='Contact Me'>
          <ContactMe />
        </AboutContent>
      </div>
    </Container>
  )
}
