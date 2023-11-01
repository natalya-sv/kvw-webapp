import { PUSH_POST } from "../../APIData";

const tokenPrefix = process.env.REACT_APP_TOKEN_PREFIX + " ";
export const getUserToken = () => {
  const token = localStorage.getItem("userToken");
  return token;
};
export const fetchData = async (fetchApi) => {
  const token = getUserToken();
  const response = await fetch(fetchApi, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenPrefix + token,
    },
  });
  if (!response.ok) {
    return null;
  }
  return await response.json();
};

export const updateSingleItem = async (
  updatedItemId,
  updatedItemData,
  apiPut,
  apiPublish
) => {
  const token = getUserToken();
  const response = await fetch(apiPut + updatedItemId, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenPrefix + token,
    },
    body: JSON.stringify(updatedItemData),
  });
  const updatedData = await response.json();

  if (!response.ok) {
    return null;
  } else {
    const isUpdateSuccessful = await publishUpdates(apiPublish);
    return { isUpdateSuccessful, updatedData };
  }
};

export const removeSingleItem = async (
  id,
  apiDeleteItem,
  apiPublishChnages
) => {
  const token = getUserToken();
  const response = await fetch(apiDeleteItem + id, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenPrefix + token,
    },
  });

  if (!response.ok) {
    return null;
  } else {
    const publishResponse = await publishUpdates(apiPublishChnages);
    return publishResponse;
  }
};
export const addNewItem = async (item, apiPost, apiPublishChanges) => {
  const token = getUserToken();

  const response = await fetch(apiPost, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenPrefix + token,
    },
    body: JSON.stringify(item),
  });
  const newItem = await response.json();

  if (!response.ok) {
    return null;
  } else {
    const isUpdateSuccessful = await publishUpdates(apiPublishChanges);
    return { isUpdateSuccessful, newItem };
  }
};
export const updateAllItems = async (items, apiUpdateItems, apiPublish) => {
  const token = getUserToken();

  const response = await fetch(apiUpdateItems, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenPrefix + token,
    },
    body: JSON.stringify(items),
  });

  if (!response.ok) {
    return null;
  } else {
    return await publishUpdates(apiPublish);
  }
};

export const removeSeveralItems = async (
  ids,
  deleteSomeItemsApi,
  updateChangesApi
) => {
  let response = null;
  let responses = [];
  const token = getUserToken();

  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    response = await fetch(deleteSomeItemsApi + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: tokenPrefix + token,
      },
    });

    if (response.ok) {
      responses.push("ok");
    }
  }

  if (responses.length > 0) {
    const publishResponse = await publishUpdates(updateChangesApi);
    return publishResponse;
  } else {
    return null;
  }
};
export const removeAllItems = async (deleteAllItemsApi, updateChangesApi) => {
  const token = getUserToken();

  const response = await fetch(deleteAllItemsApi, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenPrefix + token,
    },
  });

  if (response.ok) {
    const publishResponse = await publishUpdates(updateChangesApi);
    return publishResponse;
  } else {
    return null;
  }
};

const publishUpdates = async (publishUpdatesApi) => {
  const token = getUserToken();
  const publishResponse = await fetch(publishUpdatesApi, {
    method: "GET",
    headers: {
      Authorization: tokenPrefix + token,
    },
  });
  if (publishResponse.ok) {
    return true;
  } else {
    return null;
  }
};

export const publishScheduleV2 = async (publishUpdatesApi) => {
  const token = getUserToken();
  const publishResponse = await fetch(publishUpdatesApi, {
    method: "GET",
    headers: {
      Authorization: tokenPrefix + token,
    },
  });
  if (publishResponse.ok) {
    return true;
  } else {
    return null;
  }
};
export const sendPushMessage = async (title, message) => {
  const token = getUserToken();

  const pushMessageResponse = await fetch(PUSH_POST, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: tokenPrefix + token,
    },
    body: JSON.stringify({
      title,
      message,
    }),
  });
  return await pushMessageResponse.json();
};
