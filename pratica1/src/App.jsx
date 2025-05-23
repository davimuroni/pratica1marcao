import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
<<<<<<< HEAD
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
import './App.css'; // Você pode criar esse arquivo ou ignorar

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [nomeSelecionado, setNomeSelecionado] = useState('');

  // Requisição com useEffect + Axios ao carregar a página
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setUsuarios(res.data);
        setUsuariosFiltrados(res.data);
>>>>>>> 03ec211b4497b97aba09eba1dcc0466fecc8f75a
      })
      .catch(err => console.log("Erro ao carregar dados:", err));
  }, []);

<<<<<<< HEAD
  /**
   * filtrarPorNome - filtra os usuários com base no nome selecionado
   * @param {string} nome - Nome selecionado no botão de filtro
   */
=======
  // Filtrar usuários por nome
>>>>>>> 03ec211b4497b97aba09eba1dcc0466fecc8f75a
  const filtrarPorNome = (nome) => {
    setNomeSelecionado(nome);

    if (nome === '') {
<<<<<<< HEAD
      // Se o nome estiver vazio, mostra todos os usuários
      setUsuariosFiltrados(usuarios);
    } else {
      // Filtra apenas os usuários cujo nome seja igual ao selecionado
=======
      setUsuariosFiltrados(usuarios); // Mostrar todos
    } else {
>>>>>>> 03ec211b4497b97aba09eba1dcc0466fecc8f75a
      const filtrados = usuarios.filter(usuario => usuario.name === nome);
      setUsuariosFiltrados(filtrados);
    }
  };

<<<<<<< HEAD
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
=======
  // Nomes únicos dos usuários
  const nomesUnicos = [...new Set(usuarios.map(usuario => usuario.name))];

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Painel de Usuários</h1>

      {/* Botões de filtro por nome */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button
          className={`btn ${nomeSelecionado === '' ? 'btn-primary' : 'btn-outline-primary'}`}
>>>>>>> 03ec211b4497b97aba09eba1dcc0466fecc8f75a
          onClick={() => filtrarPorNome('')}
        >
          Mostrar Todos
        </button>

        {nomesUnicos.map(nome => (
          <button
            key={nome}
<<<<<<< HEAD
            className={`btn btn-sm fw-semibold ${nomeSelecionado === nome ? 'btn-primary' : 'btn-outline-primary'}`}
=======
            className={`btn ${nomeSelecionado === nome ? 'btn-primary' : 'btn-outline-primary'}`}
>>>>>>> 03ec211b4497b97aba09eba1dcc0466fecc8f75a
            onClick={() => filtrarPorNome(nome)}
          >
            {nome}
          </button>
        ))}
      </div>

<<<<<<< HEAD
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
=======
      {/* Lista de usuários */}
      <div className="row">
        {usuariosFiltrados.length > 0 ? (
          usuariosFiltrados.map(usuario => (
            <div className="col-12 col-md-4 mb-4" key={usuario.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{usuario.name}</h5>
                  <p><strong>Usuário:</strong> {usuario.username}</p>
                  <p><strong>Email:</strong> {usuario.email}</p>
                  <p><strong>Cidade:</strong> {usuario.address.city}</p>
                  <p><strong>Empresa:</strong> {usuario.company.name}</p>
                  <p><strong>Telefone:</strong> {usuario.phone}</p>
>>>>>>> 03ec211b4497b97aba09eba1dcc0466fecc8f75a
                </div>
              </div>
            </div>
          ))
        ) : (
<<<<<<< HEAD
          <p className="text-center text-muted">Nenhum usuário encontrado.</p>
=======
          <p className="text-center">Nenhum usuário encontrado.</p>
>>>>>>> 03ec211b4497b97aba09eba1dcc0466fecc8f75a
        )}
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 03ec211b4497b97aba09eba1dcc0466fecc8f75a
