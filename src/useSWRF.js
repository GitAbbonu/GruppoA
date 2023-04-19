import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useSWRF() {
  const common_request = (data, method) => {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
      mode: "cors",
    };
  };

  const PLANETS_URL = "http://localhost:5000/planets";

  //CRUD----------------------------------------------------------------------

  //GetAll
  const { data, error } = useSWR(PLANETS_URL, fetcher);

  //GetOne
  async function getOne(id) {
    const res = await fetch(PLANETS_URL + "/" + id);
    const json = await res.json();
    console.log(json);
    return json;
  }

  //Create
  async function create(data) {
    const option = common_request(data, "POST");

    const res = await fetch(PLANETS_URL, option);
    const json = await res.json();
    mutate(PLANETS_URL);
    return json;
  }

  //Update
  async function update(id, data) {
    const option = common_request(data, "PUT");

    const res = await fetch(PLANETS_URL + "/" + id, option);
    const json = await res.json();
    mutate(PLANETS_URL);
    return json;
  }

  //Delete
  async function deletePlanet(id) {
    const option = common_request(null, "DELETE");

    await fetch(PLANETS_URL + "/" + id, option);

    mutate(PLANETS_URL);
  }

  return { data, error, getOne, create, update, deletePlanet };
}
export default useSWRF;
