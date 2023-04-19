import { useState } from "react";
import useSWRF from "./useSWRF";

function App() {
  const { data, error, getOne, create, update, deletePlanet } = useSWRF();

  const [planet, setPlanet] = useState("");

  console.log(data);

  //GET ONE
  async function getOnePlanet(id) {
    try {
      const res = await getOne(id);

      console.log(res);
      setPlanet(res);
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  //CREATE
  async function createHandler() {
    try {
      await create({ name: "Pippo" });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  //UPDATE
  async function updateHandler(id) {
    try {
      await update(id, { name: "updato" });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

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
            {/* //DELETE (UP)*/}
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
