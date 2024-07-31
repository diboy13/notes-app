const baseUrl = "https://notes-api.dicoding.dev/v2";

async function getNotes() {
  try {
    const response = await fetch(`${baseUrl}/notes`);
    const responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log(error);
  }
}

async function createNotes() {
  try {
    const response = await fetch(`${baseUrl}/notes`, {
      method: "POST",
      body: JSON.stringify({
        title: "test hallo",
        body: "test body",
      }),
    });
    const responseJson = await response.json();
    console.log(responseJson);
  } catch (error) {
    console.log(error);
  }
}
export { getNotes, createNotes };
