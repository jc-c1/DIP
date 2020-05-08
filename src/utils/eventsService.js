import tokenService from "./tokenService";

const BASE_URL = "/api/events/";

export default {
  index,
  create,
  update,
  deleteEvent,
};

function index() {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  };
  return fetch(BASE_URL, options).then((res) => res.json());
}

function create(event) {
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      // Add this header - don't forget the space after Bearer
      Authorization: "Bearer " + tokenService.getToken(),
    },
    body: JSON.stringify(event),
  };
  return fetch(BASE_URL, options).then((res) => res.json());
}

function update(body) {
  const options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      // Add this header - don't forget the space after Bearer
      Authorization: "Bearer " + tokenService.getToken(),
    },
    body: JSON.stringify(body),
  };

  return fetch(BASE_URL, options).then((res) => res.json());
}

function deleteEvent(body) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      // Add this header - don't forget the space after Bearer
      Authorization: "Bearer " + tokenService.getToken(),
    },
    body: JSON.stringify(body),
  };

  return fetch(BASE_URL, options).then((res) => res.json());
}
