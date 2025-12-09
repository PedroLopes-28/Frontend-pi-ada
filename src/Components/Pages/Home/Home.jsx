import { useEffect, useState } from "react";
import api from "../../../services/api";
import "./Home.css";

export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [newJokeSetup, setNewJokeSetup] = useState("");
  const [newJokePunchline, setNewJokePunchline] = useState("");
  
  const [editJokeId, setEditJokeId] = useState(null);
  const [editSetup, setEditSetup] = useState("");
  const [editPunchline, setEditPunchline] = useState("");

  const user_id = localStorage.getItem("id");
  console.log(user_id)

  useEffect(() => {
    async function fetchJokes() {
      if (!user_id) return;
      try {
        const response = await api.get("/joke/user", { params: { user_id } });
        setJokes(response.data);
      } catch (error) {
        console.error("Erro ao carregar piadas:", error);
      }
    }

    fetchJokes();
  }, [user_id]);

  async function handleCreateJoke(e) {
    e.preventDefault();
    if (!newJokeSetup.trim() || !newJokePunchline.trim() ||!user_id) return;

    try {
      const response = await api.post("/joke", { setup: newJokeSetup, punchline: newJokePunchline, user_id });
      
      setJokes(prev => [...prev, response.data]);

      setNewJokeSetup("");
      setNewJokePunchline("");

    } catch (error) {
      console.error("Erro ao criar piada:", error);
      alert("Erro ao criar piada. Tente novamente.");
    }
  }

  async function handleRandomJoke() {
    if (!user_id) return;

    try {
      const response = await api.get("/joke/random", { params: { user_id } });
      const joke = response.data;

      setNewJokeSetup(joke.setup);
      setNewJokePunchline(joke.punchline);
    } catch (error) {
      console.error("Erro ao gerar piada aleatória:", error);
      alert("Erro ao gerar piada aleatória. Tente novamente.");
    }
  }

  async function handleDelete(id) {
    try {
      await api.delete("/joke/remove", { params: { joke_id: id } });
      setJokes(prev => prev.filter(j => j.id !== id));
    } catch (error) {
      console.error("Erro ao excluir piada:", error);
      alert("Erro ao excluir piada. Tente novamente.");
    }
  }

  async function handleSaveEdit(id) {
    if (!editSetup.trim() || !editPunchline.trim() || !user_id) return;

    try {
      await api.put(
        "/joke/edit",
        { setup: editSetup, punchline: editPunchline, user_id },
        { params: { joke_id: id } }
      );
      
        setJokes(prev =>
        prev.map(j => {
          if (j.id === id) {
            return {...j, setup : editSetup, punchline : editPunchline};
          }
          else{
            return j;
          }
        })
      );

      setEditJokeId(null);
      setEditSetup("");
      setEditPunchline("");
    } catch (error) {
      console.error("Erro ao editar piada:", error);
      alert("Erro ao editar piada. Tente novamente.");
    }
  }

  return (
    <div className="pagina_home">
      <div className="container">
        <div className="container_criar_piada">

          <div>
            <button className="botao_adicionar" onClick={handleRandomJoke}>Gerar piada aleatória</button>
          </div>

          <hr />
            <p>Criar uma Nova Piada</p>
            <form onSubmit={handleCreateJoke}>
              <input type="text" placeholder="Digite o começo da piada" value={newJokeSetup} onChange={(e) => setNewJokeSetup(e.target.value)}/>

              <input type="text" placeholder="Digite a punchline da piada" value={newJokePunchline} onChange={(e) => setNewJokePunchline(e.target.value)}/>

              <button className="botao_adicionar" type="submit">Adicionar</button>
            </form>
          <hr />
          
        </div>

        <div className="container_lista_piada">
          <p>Lista de Piadas: </p>

         <ul className="lista_piada">
  {jokes.map((joke) => {

    if (editJokeId === joke.id) {
      return (
        <li key={joke.id} className="item_piada">
          <div className="edit_container">
            <input className="input_edit"
              type="text"
              value={editSetup}
              onChange={(e) => setEditSetup(e.target.value)}
              placeholder="Edite o começo da piada"
            />

            <input className="input_edit"
              type="text"
              value={editPunchline}
              onChange={(e) => setEditPunchline(e.target.value)}
              placeholder="Edite a punchline da piada"
            />

            <button className="botao_salvar" onClick={() => handleSaveEdit(joke.id)}>Salvar</button>
            <button className="botao_cancelar" onClick={() => setEditJokeId(null)}>Cancelar</button>
          </div>
        </li>
      );
    }

    return (
      <li key={joke.id} className="item_piada">
        <div className="display_piada">

          <span className="texto_piada">
            {joke.setup} - {joke.punchline}
          </span>

          <div className="botao_editar">
            <button onClick={() => {
              setEditJokeId(joke.id);
              setEditSetup(joke.setup);
              setEditPunchline(joke.punchline);
            }}>
              Editar
            </button>

            <button className="botao_excluir" onClick={() => handleDelete(joke.id)}>
              Excluir
            </button>
          </div>
        </div>
      </li>
    );
  })}
</ul>
        </div>
      </div>
    </div>
  );
}