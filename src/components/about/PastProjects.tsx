import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AboutContent from './AboutContent'
import AboutList from './AboutList'
import { Link } from '../general'

const RepoLink = ({ repo }: { repo: string }) => (
  <Link href={`https://www.github.com/nickcoffey/${repo}`}>
    <FontAwesomeIcon icon={faExternalLinkAlt} /> Source Code
  </Link>
)

export default function PastProjects() {
  return (
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
  )
}
