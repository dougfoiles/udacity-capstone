import { useState } from "react";
import { json, useLoaderData } from "react-router-dom";

import PageContent from "../components/common/PageContent";
import Journal from "../components/journal/Journal";
import { useInfiniteScroll } from "../utils/hooks/infiniteScroll";

const JournalPage = () => {
  const { items, hasNext, loadNext, loadMoreRef } = useInfiniteScroll({
    getItems: loader,
    options: { loadingType: "partial", partialInfiniteLimit: 3 },
  });

  return (
    <PageContent>
      <Journal
        journalEntries={items}
        hasNext={hasNext}
        loadNext={loadNext}
        loadMoreRef={loadMoreRef}
      />
    </PageContent>
  );
};

export async function loader({ request, params }) {
  const response = await fetch("http://localhost:8080/journal");

  if (!response.ok) {
    throw json(
      { message: "Could not fetch journal entries." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData;
  }
}

export async function action({ request, params }) {
  const method = request.method;
  const data = Object.fromEntries(await request.formData());

  const journalEntryData = {
    title: data.title,
    text: data.text,
  };

  let url = "http://localhost:8080/journal";

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(journalEntryData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event." }, { status: 500 });
  }

  return response;
}

export default JournalPage;
