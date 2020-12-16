import AboutContent from './AboutContent'
import AboutList from './AboutList'

export default function WorkExperience() {
  const lists = [
    {
      header: 'Frontend Engineer',
      subheader: 'Coolfire Solutions (2020 - Present)',
      items: [
        'Work on the frontend team developing three main web applications.',
        'The apps are being built with TypeScript React. Two of them are using the Next.js framework.',
        'All testing is done in-house by the dev team with support unit tests and integration tests written in Cypress.'
      ]
    },
    {
      header: 'Advanced Technologies Developer',
      subheader: 'AAA (2018 - 2020)',
      items: [
        'Helped develop and fix business logic in proprietary frameworks called PolicyCenter and BillingCenter which are built on a JVM language named GoSu.',
        'Worked on a team of teams under the LeSS Agile framework supporting the core insurance business application.',
        'Our Jenkins server built and deployed code to a number of different environments using my custom Jenkins pipelines.'
      ]
    },
    {
      header: 'Business Analyst',
      subheader: 'Charter Communications (2017 - 2018)',
      items: [
        'Worked on the E-Commerce team supporting the application that helps users purchase and customize their cable service.',
        'One of my main roles was to write and maintain Jenkins deployment scripts. The scripts were run weekly and were tested with REST API tests that I made in SoapUI.',
        'My other main task was to build reports for displaying sales based on factors such as location and cable package. The data was sourced and cleaned with Alteryx and the visualizations were made with Tableau.'
      ]
    }
  ]

  return (
    <AboutContent header='Work Experience'>
      {lists.map(({ ...rest }, index) => (
        <AboutList {...rest} key={index} style={{ marginBottom: index + 1 !== lists.length ? '1rem' : undefined }} />
      ))}
    </AboutContent>
  )
}
