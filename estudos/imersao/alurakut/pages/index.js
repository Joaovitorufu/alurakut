import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AluraKutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'

function ProfileSideBar ({gitHubUser}) {
  return (
    <Box>
    <img src={`https://github.com/${gitHubUser}.png`} alt="Image User" style= {{borderRadius: '8px'}} />
  </Box>
  )
}


export default function Home() {
  const gitHubUser = "joaovitorufu";
  const pessoasFavoritas = [
  'juunegreiros',
  'omariosouto',
  'peas',
  'devanomaly',
  'bsz-bruno',
  'vercel'
  ]

  return (
    <>
    <AlurakutMenu/>
    <MainGrid>
      <div className="profileArea" style={{gridArea:'profileArea'}}>
       <ProfileSideBar gitHubUser={gitHubUser}/>
      </div>

      <div className="welcomeArea" style={{gridArea:'welcomeArea'}}>
        <Box>
          <h1 className="titte">
              Bem vindo(a)
          </h1> 
          <OrkutNostalgicIconSet/>
        </Box>
      </div>

      <div className="profileRelationsArea" style={{gridArea:'profileRelationsArea'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas Da Comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
          {pessoasFavoritas.map((itemAtual) => {
            return (
              <li>
                <a href={`/users/${itemAtual}`} key={itemAtual}>
                  <img src={`https://github.com/${itemAtual}.png`}/>
                  <span>{itemAtual}</span>
                </a>
              </li>
              
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <Box>
          Comunidades
        </Box>
      </div>
    </MainGrid>
    </>
  )
}
