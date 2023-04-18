import { useState } from "react";
import useSWRF from "./useSWRF";

function App() {
  const { data, error, getOne, create, update, deletePlanet } = useSWRF();

  const [planet, setPlanet] = useState("");

  console.log(data);

  //GET ONE
  async function getOnePlanet(id) {
    const res = await getOne(id);

    console.log(res);
    setPlanet(res);
  }

  //CREATE
  async function createHandler() {
    await create({ name: "Pippo" });
  }

  //UPDATE
  async function updateHandler(id) {
    await update(id, { name: "updato" });
  }

  //DELETE

  return (
    <div>
      <h2>I Pianeti sono:</h2>
      {data?.map((p) => {
        return (
          <div key={p.id}>
            <h1>{p.name}</h1>
            <button onClick={() => getOnePlanet(p.id)}>Visualizza</button>
            <button onClick={() => updateHandler(p.id)}>Update: updato</button>
            <button onClick={() => deletePlanet(p.id)}>Eliminato</button>
          </div>
        );
      })}
      <div>
        {planet && (
          <div>
            <h2>planet: {planet.name}</h2>
          </div>
        )}
      </div>
      <section>
        <button onClick={createHandler}>Invia nuovo Pianeta Pluto</button>
      </section>
    </div>
  );
}

export default App;
