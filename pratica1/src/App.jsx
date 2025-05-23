import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // Estado para armazenar todos os usuários carregados da API
  const [usuarios, setUsuarios] = useState([]);

  // Estado para armazenar os usuários filtrados (exibidos na tela)
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

  // Estado que guarda o nome atualmente selecionado para filtro
  const [nomeSelecionado, setNomeSelecionado] = useState('');

  // Estado que controla a visibilidade dos detalhes de cada usuário
  const [detalhesVisiveis, setDetalhesVisiveis] = useState({});

  /**
   * useEffect - executado uma vez quando o componente é montado
   * Busca os usuários da API e adiciona um campo fictício de sexo (alternando entre "male" e "female")
   */
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        const usersWithGender = res.data.map((user, index) => ({
          ...user,
          sexo: index % 2 === 0 ? 'male' : 'female'
        }));

        setUsuarios(usersWithGender);
        setUsuariosFiltrados(usersWithGender);
      })
      .catch(err => console.log("Erro ao carregar dados:", err));
  }, []);

  /**
   * filtrarPorNome - filtra os usuários com base no nome selecionado
   * @param {string} nome - Nome selecionado no botão de filtro
   */
  const filtrarPorNome = (nome) => {
    setNomeSelecionado(nome);

    if (nome === '') {
      // Se o nome estiver vazio, mostra todos os usuários
      setUsuariosFiltrados(usuarios);
    } else {
      // Filtra apenas os usuários cujo nome seja igual ao selecionado
      const filtrados = usuarios.filter(usuario => usuario.name === nome);
      setUsuariosFiltrados(filtrados);
    }
  };

  /**
   * alternarDetalhes - alterna a visibilidade dos detalhes de um usuário
   * @param {number} id - ID do usuário a ser exibido ou ocultado
   */
  const alternarDetalhes = (id) => {
    setDetalhesVisiveis(prev => ({
      ...prev,
      [id]: !prev[id] // Inverte o estado atual (mostrar ou esconder)
    }));
  };

  // Cria um array com nomes únicos dos usuários para gerar os botões de filtro
  const nomesUnicos = [...new Set(usuarios.map(usuario => usuario.name))];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 text-primary fw-bold">📊 Painel de Usuários</h1>

      {/* Botões para filtrar os usuários por nome */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button
          className={`btn btn-sm fw-semibold ${nomeSelecionado === '' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => filtrarPorNome('')}
        >
          Mostrar Todos
        </button>

        {nomesUnicos.map(nome => (
          <button
            key={nome}
            className={`btn btn-sm fw-semibold ${nomeSelecionado === nome ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => filtrarPorNome(nome)}
          >
            {nome}
          </button>
        ))}
      </div>

      {/* Cartões com os usuários filtrados */}
      <div className="row">
        {usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map((usuario) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={usuario.id}>
              <div className="card shadow-sm border-0 h-100 custom-card">
                <div className="card-body d-flex">
                  {/* Avatar com cor baseada no sexo */}
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(usuario.name)}&background=${usuario.sexo === 'male' ? '007bff' : 'e83e8c'}&color=fff&size=64`}
                    alt="Avatar"
                    className="rounded-circle me-3"
                    width="64"
                    height="64"
                  />
                  <div>
                    {/* Nome clicável que mostra/oculta detalhes */}
                    <h5
                      className="card-title text-primary fw-bold mb-1"
                      style={{ cursor: 'pointer' }}
                      onClick={() => alternarDetalhes(usuario.id)}
                    >
                      {usuario.name}
                    </h5>

                    {/* Detalhes do usuário (visíveis apenas se clicado) */}
                    {detalhesVisiveis[usuario.id] && (
                      <ul className="list-unstyled mb-0 small mt-2">
                        <li><strong>Usuário:</strong> {usuario.username}</li>
                        <li><strong>Email:</strong> {usuario.email}</li>
                        <li><strong>Cidade:</strong> {usuario.address.city}</li>
                        <li><strong>Empresa:</strong> {usuario.company.name}</li>
                        <li><strong>Telefone:</strong> {usuario.phone}</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;
