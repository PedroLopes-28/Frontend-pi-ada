import React, { useState } from "react";
import { api } from "../services/api";

export default function FormPiada({ onRefresh }) {
  const [texto, setTexto] = useState("");

  async function criarPiada(e) {
    e.preventDefault();

    if (!texto.trim()) return alert("Digite uma piada!");

    try {
      await api.post("/joke", { texto });
      setTexto("");
      onRefresh(); // recarrega a lista
    } catch (err) {
      console.log(err);
      alert("Erro ao criar piada");
    }
  }

  return (
    <div className="form-container" style={{ padding: "20px" }}>
      <h2>Criar piada</h2>

      <form onSubmit={criarPiada}>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite sua piada..."
          style={{ width: "100%", height: "100px" }}
        />

        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            backgroundColor: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Criar
        </button>
      </form>
    </div>
  );
}
