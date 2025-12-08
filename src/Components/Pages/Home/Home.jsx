import { useEffect, useState } from "react";
import api from "../../../services/api";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [randomJoke, setRandomJoke] = useState("");
  const [newJokeSetup, setNewJokeSetup] = useState("");
  const [newJokePunchline, setNewJokePunchline] = useState("");
  const [editJokeId, setEditJokeId] = useState(null);
  const [editJokeText, setEditJokeText] = useState("");
  const navigate = useNavigate();

  const user_id = localStorage.getItem("id");
  console.log(user_id)


  async function fetchJokes() {
    if (!user_id) return;
    try {
      const response = await api.get("/joke/user", { params: { user_id } });
      setJokes(response.data);
    } catch (error) {
      console.error("Erro ao carregar piadas:", error);
    }
  }

//CRIA PIADA
  async function handleCreateJoke(e) {
    e.preventDefault();
    if (!newJokeSetup.trim() || !newJokePunchline.trim() ||!user_id) return;

    try {
      const response = await api.post("/joke", { setup: newJokeSetup, punchline: newJokePunchline, user_id });
      
      // adiciona no estado local sem duplicar
      setJokes(prev => [...prev, response.data]);
      setNewJoke("");
    } catch (error) {
      console.error("Erro ao criar piada:", error);
      alert("Erro ao criar piada. Tente novamente.");
    }
  }

  // --- GERAR PÍADA ALEATÓRIA ---
  async function handleRandomJoke() {
    if (!user_id) return;

    try {
      const response = await api.get("/joke/random", { params: { user_id } });
      const joke = response.data;
      setRandomJoke(`${joke.setup} — ${joke.punchline}`);
      window.location.reload();//recarrega a pagina
    } catch (error) {
      console.error("Erro ao gerar piada aleatória:", error);
      alert("Erro ao gerar piada aleatória. Tente novamente.");
    }
  }

  // --- EXCLUIR PIADA ---
  async function handleDelete(id) {
    try {
      await api.delete("/joke/remove", { params: { joke_id: id } });
      setJokes(prev => prev.filter(j => j.id !== id));
    } catch (error) {
      console.error("Erro ao excluir piada:", error);
      alert("Erro ao excluir piada. Tente novamente.");
    }
  }

  // --- SALVAR EDIÇÃO ---
  async function handleSaveEdit(id) {
    if (!editJokeText.trim() || !user_id) return;

    try {
      await api.put(
        "/joke/edit",
        { setup: editJokeText, punchline: editJokeText, user_id },
        { params: { joke_id: id } }
      );

      setJokes(prev =>
        prev.map(j => (j.id === id ? { ...j, setup: editJokeText, punchline: editJokeText } : j))
      );

      setEditJokeId(null);
      setEditJokeText("");
    } catch (error) {
      console.error("Erro ao editar piada:", error);
      alert("Erro ao editar piada. Tente novamente.");
    }
  }

  function logoutHandler(){
    localStorage.removeItem("id");
    localStorage.removeItem("token");

    navigate("/login");
  }

  useEffect(() => {
    fetchJokes();
  }, []);

  return (
    <div className="home-container">
      <div className="botoes">
      <button onClick={handleRandomJoke}>Gerar piada aleatória</button>
      <button onClick={logoutHandler}>Logout</button>
      </div>
      {randomJoke && <p><strong>Piada aleatória:</strong> {randomJoke}</p>}

      <hr />

      <h3>Criar nova piada</h3>
      <form onSubmit={handleCreateJoke}>
        <input
          type="text"
          placeholder="Digite o começo da piada"
          value={newJokeSetup}
          onChange={(e) => setNewJokeSetup(e.target.value)}
        />
        <input
          type="text"
          placeholder="Digite a punchline da piada"
          value={newJokePunchline}
          onChange={(e) => setNewJokePunchline(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <hr />

      <h3>Lista de piadas</h3>
      <ul className="joke-list">
        {jokes.map((joke) => (
          <li key={joke.id} className="joke-item">
            {editJokeId === joke.id ? (
              <>
                <input
                  className="edit-input"
                  type="text"
                  value={editJokeText}
                  onChange={(e) => setEditJokeText(e.target.value)}
                />
                <button className="btn-save" onClick={() => handleSaveEdit(joke.id)}>Salvar</button>
                <button onClick={() => setEditJokeId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <span className="joke-text">{joke.setup} — {joke.punchline}</span>
                <div>
                  <button onClick={() => { setEditJokeId(joke.id); setEditJokeText(joke.setup); }}>Editar</button>
                  <button className="btn-delete" onClick={() => handleDelete(joke.id)}>Excluir</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
