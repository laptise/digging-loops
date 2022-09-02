export function buildForm<T extends { [key: string]: string }>(data: T): FormData {
  const form = new FormData();
  for (const key in data) {
    form.append(key, data[key]);
  }
  return form;
}
