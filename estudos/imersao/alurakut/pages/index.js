import {useState} from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet} from '../src/lib/AluraKutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'

function ProfileSideBar ({gitHubUser}) {
  return (
    <Box as="aside">
    <img src={`https://github.com/${gitHubUser}.png`} alt="Image User" style= {{borderRadius: '8px'}} />
    <hr/>
    <p>
    <a className="boxLink" href={`https://github.com/${gitHubUser}`}>
      @{gitHubUser}
    </a>

    </p>
    <hr/>

    <AlurakutProfileSidebarMenuDefault/>
  </Box>
  )
}


export default function Home() {
  const [allComunidades, setAllComunidades] = useState([]);
  const [numComunidades, setNumComunidades] = useState(0);
  const [comunidades, setComunidades ] = useState([]);

  const gitHubUser = "joaovitorufu";
  const pessoasFavoritas = [
  'juunegreiros',
  'omariosouto',
  'peas',
  'devanomaly',
  'bsz-bruno',
  'vercel'
  ]
  console.log(allComunidades);
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
              Bem vindo(a) {gitHubUser}
          </h1> 
          <OrkutNostalgicIconSet/>
        </Box>
        <Box>
            <h2 className="subTitle">O que você deseja fazer ?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
  
                const dadosDoForm = new FormData(e.target);
                const comunidade = {
                  id: new Date().toISOString(),
                  title : dadosDoForm.get('title'),
                  image : dadosDoForm.get('image')
                }
                const comunidadesHome = [...comunidades,comunidade]
                const allComunidades = [...comunidades,comunidade]
                if(comunidades.length<6){
                    setComunidades(comunidadesHome)
                    setAllComunidades(allComunidades)
                    
                }else{
                  setAllComunidades(allComunidades)
                }
                setNumComunidades(numComunidades + 1)

            }}>
              <div>

              <input 
               placeholder="Qual vai ser o nome da sua comunidade?"
               type ="text"
               name="title" 
               aria-label="Qual vai ser o nome da sua comunidade?"/>

              </div>
              <div>

              <input 
               placeholder="Coloque uma URL para usarmos de capa"
               type ="text"
               name="image" 
               aria-label="Coloque uma URL para usarmos de capa"/>

              </div>
              <button>
                  Criar comunidade
              </button>
            </form>
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
              <li key={itemAtual}>
                <a href={`https://github.com/${itemAtual}`}>
                  <img src={`https://github.com/${itemAtual}.png`}/>
                  <span>{itemAtual}</span>
                </a>
              </li>
              
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({numComunidades})
          </h2>
          <ul>
          {comunidades.map((itemAtual) => {
            return (
              <li>
                <a href={`/users/${itemAtual.title}`} key={itemAtual.id}>
                  <img src={itemAtual.image}/>
                  <span>{itemAtual.title}</span>
                </a>
              </li>
              
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
      </div>
    </MainGrid>
    </>
  )
}
