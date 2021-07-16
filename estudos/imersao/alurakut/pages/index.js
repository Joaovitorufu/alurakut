import {useState, useEffect} from 'react'
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
function ProfileRelationsBox ({itens, title})  {
  return (
    <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {title} ({itens.length})
          </h2>
          <ul>
          {/* {comunidades.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={`/users/${itemAtual.title}`} >
                  <img src={itemAtual.image}/>
                  <span>{itemAtual.title}</span>
                </a>
              </li>
              
            )
          })} */}
          </ul>
        </ProfileRelationsBoxWrapper>
  )
}


export default function Home() {

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
  //senha do Dato : Test123456
    const [seguidores, setSeguidores] = useState([]);

    useEffect(function(){
      fetch('https://api.github.com/users/peas/followers')
    .then((respostaDoServidor)=>{
      return respostaDoServidor.json();
    })
    .then((respostaCompleta)=>{
      setSeguidores(respostaCompleta);
    })

    //api GraphQL
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': '1b5b4f7d83f39b0b933969f1c4a2a7',
           'Content-Type': 'application/json',
           'Accept':'application/json',
        },
        body: JSON.stringify({"query": `query {
          allCommunities {
            title
            id
            imageUrl
            creatorSlug
          }
        }`})
      })
      .then((response)=> response.json())
      .then((respostaCompleta)=>{
        const comunidadesDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesDato)
        console.log(respostaCompleta)
        setComunidades(comunidadesDato)
      })
    }, [])


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
                
                setComunidades(comunidadesHome)
                    

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
        <ProfileRelationsBox 
        title="seguidores"
        itens = {seguidores} 
        />

        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Comunidades ({comunidades.length})
          </h2>
          <ul>
          {comunidades.map((itemAtual) => {
            return (
              <li key={itemAtual.id}>
                <a href={`/communities/${itemAtual.id}`} >
                  <img src={itemAtual.imageUrl}/>
                  <span>{itemAtual.title}</span>
                </a>
              </li>
              
            )
          })}
          </ul>
        </ProfileRelationsBoxWrapper>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            Pessoas Da Comunidade ({pessoasFavoritas.length})
          </h2>
          <ul>
          {pessoasFavoritas.map( (itemAtual) => {
            return (
              <li key={itemAtual}>
                <a href={`/users/${itemAtual}`}>
                  <img src={`https://github.com/${itemAtual}.png`}/>
                  <span>{itemAtual}</span>
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
