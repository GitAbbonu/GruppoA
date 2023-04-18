import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function useSWRF() {
  //GetAll
  const { data, error } = useSWR("http://localhost:5000/planets", fetcher);

  //GetOne
  async function getOne(id) {
    const res = await fetch("http://localhost:5000/planets/" + id, fetcher);
    const json = res.json();
    console.log(json);
    return json;
  }

  //Create
  async function create(data) {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    };

    const res = await fetch("http://localhost:5000/planets", option);
    const json = await res.json();
    mutate("http://localhost:5000/planets");
    return json;
  }

  //Update
  async function update(id, data) {
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      mode: "cors",
    };

    const res = await fetch("http://localhost:5000/planets/" + id, option);
    const json = await res.json();
    mutate("http://localhost:5000/planets");
    return json;
  }

  //Delete
  async function deletePlanet(id) {
    const option = {
      method: "DELETE",
      mode: "cors",
    };

    await fetch("http://localhost:5000/planets/" + id, option);

    mutate("http://localhost:5000/planets");
  }

  return { data, error, getOne, create, update, deletePlanet };
}
export default useSWRF;
