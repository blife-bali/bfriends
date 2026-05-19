const GOOGLE_FORM_ACTION_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSclRqNzLi-46Dnn36_fYoOP1XCw9EAcIAt8U_xAEjHPuKQBGg/formResponse";
const ENTRY_ID = "entry.18557205";

export async function submitNewsletterEmail(email: string) {
  const formData = new FormData();
  formData.append(ENTRY_ID, email);

  await fetch(GOOGLE_FORM_ACTION_URL, {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
}
