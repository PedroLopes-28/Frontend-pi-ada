import React, { useState } from "react";
import { api } from "../services/api";

export default function ListaPiadas({ piadas, onRefresh }) {
  const [editando, setEditando] = useState(null);
  const [novoTexto, setNovoTexto] = useState("");

  async function deletar(id) {
    await api.delete(`/joke/remove?joke_id=${id}`);
    onRefresh();
  }

  async function salvarEdicao(id) {
    await api.put(`/joke/edit?joke_id=${id}`, { texto: novoTexto });
    setEditando(null);
    onRefresh();
  }

  async function carregarAleatoria() {
    try {
      const r = await api.get("/joke/random");
      alert("Piada aleatória:\n\n" + r.data.texto);
    } catch (err) {
      alert("Erro ao carregar piada aleatória");
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Minhas Piadas</h2>
        <button onClick={carregarAleatoria}>Gerar Aleatória</button>
      </div>

      {piadas.length === 0 && <p>Nenhuma piada encontrada.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {piadas.map((piada) => (
          <li
            key={piada.id}
            style={{
              backgroundColor: "#f1f1f1",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {editando === piada.id ? (
              <>
                <textarea
                  value={novoTexto}
                  onChange={(e) => setNovoTexto(e.target.value)}
                  style={{ width: "100%", height: "80px" }}
                />
                <button onClick={() => salvarEdicao(piada.id)}>Salvar</button>
                <button onClick={() => setEditando(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <p>{piada.texto}</p>

                <button
                  onClick={() => {
                    setEditando(piada.id);
                    setNovoTexto(piada.texto);
                  }}
                >
                  ✏️ Editar
                </button>

                <button onClick={() => deletar(piada.id)}>🗑️ Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
