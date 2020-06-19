import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get('repositories').then( response => {

      setRepositories(response.data);

      console.log(response.data);

    });

  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Repository - ${Date.now()}`,
      url: "http://github.com/railopz",
      techs: [
        'php',
        'nodejs',
        'React',
        'laravel'
      ]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const removeRepository = await api.delete(`repositories/${id}`);

    const attRepositories = repositories.filter(repository => repository.id !== id);

    setRepositories(attRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">

      { repositories.map(repository => {
          return (
            <li key={repository.id}>
              { repository.title }
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          </li>
          )
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
