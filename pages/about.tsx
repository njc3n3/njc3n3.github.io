import { Layout } from '../components/layout'

function Paragraph({ children }: { children: string }) {
  return <p className='px-4 text-left'>{children}</p>
}

export default function About() {
  return (
    <Layout title='About'>
      <div className='flex flex-col justify-center gap-4 mt-4 text-center'>
        <p className='text-5xl'>About Me</p>
        <Paragraph>
          I didn't take the typical path to becoming a software developer. As a kid I was always curious about how
          things were built and was good at math and science. I even 'dissected' an old computer in my bedroom, but in
          reality it was more of a demolition.
        </Paragraph>
        <Paragraph>
          After high school, I went to an engineering focused college in hopes of being a Civil Engineer, but quickly
          found it didn't interest me. I changed my focus to business because I've always liked math and my new
          department required me to take an Information Systems class. There I found my passion for computers and how
          they work. My first programming language was Java and I loved tinkering around and making little terminal
          applications.
        </Paragraph>
        <Paragraph>
          My Java skills grew further at my first two jobs, but my love for stopped. In my own time I tought myself
          JavaScript, HTML, and CSS building small sites and single-purpose applications. From there I learned React and
          TypeScript and that helped me land to my current job at Coolfire Solutions. Today, I enjoy the work that I do
          for Coolfire and am still learning new things outside of work.
        </Paragraph>
      </div>
    </Layout>
  )
}
