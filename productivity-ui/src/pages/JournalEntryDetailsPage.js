import { useLoaderData, json, redirect } from "react-router-dom";
import PageContent from "../components/common/PageContent";
import JourneyEntryDetails from "../components/journal/details/JournalEntryDetails";

const JournalEntryDetailsPage = () => {
  const data = useLoaderData();
  return (
    <PageContent>
      <JourneyEntryDetails details={data} />
    </PageContent>
  );
};

export async function loader({ request, params }) {
  const response = await fetch(
    "http://localhost:8080/journal/" + params.journalEntryId
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch journal entries." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.journalEntry;
  }
}

export async function action({ params, request }) {
  const journalEntryId = params.journalEntryId;
  const method = request.method;

  const response = await fetch(
    "http://localhost:8080/journal/" + journalEntryId,
    {
      method: method,
    }
  );

  if (!response.ok) {
    throw json(
      { message: "Could not delete journal entry." },
      {
        status: 500,
      }
    );
  }

  return redirect("/journal");
}

export default JournalEntryDetailsPage;
