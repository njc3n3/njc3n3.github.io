import AboutContent from '../AboutContent'
import SkillProgress, { Props as SkillProgessProps } from './SkillProgress'

export default function TechnicalSkills() {
  const skills: SkillProgessProps[] = [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'HTML', level: 'Advanced' },
    { name: 'React', level: 'Advanced' },
    { name: 'CSS', level: 'Intermediate' },
    { name: 'Java', level: 'Intermediate' },
    { name: 'Linux', level: 'Intermediate' },
    { name: 'Python' },
    { name: 'Swift' }
  ]

  return (
    <AboutContent header='Technical Skills'>
      {skills.map((skill, index) => (
        <SkillProgress {...skill} key={index} />
      ))}
    </AboutContent>
  )
}
