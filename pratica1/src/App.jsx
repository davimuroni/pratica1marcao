import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      })
      .catch(err => console.log("Erro ao carregar dados:", err));
  }, []);

  // Filtrar usuários por nome
  const filtrarPorNome = (nome) => {
    setNomeSelecionado(nome);

    if (nome === '') {
      setUsuariosFiltrados(usuarios); // Mostrar todos
    } else {
      const filtrados = usuarios.filter(usuario => usuario.name === nome);
      setUsuariosFiltrados(filtrados);
    }
  };

  // Nomes únicos dos usuários
  const nomesUnicos = [...new Set(usuarios.map(usuario => usuario.name))];

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Painel de Usuários</h1>

      {/* Botões de filtro por nome */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button
          className={`btn ${nomeSelecionado === '' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => filtrarPorNome('')}
        >
          Mostrar Todos
        </button>

        {nomesUnicos.map(nome => (
          <button
            key={nome}
            className={`btn ${nomeSelecionado === nome ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => filtrarPorNome(nome)}
          >
            {nome}
          </button>
        ))}
      </div>

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
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default App;