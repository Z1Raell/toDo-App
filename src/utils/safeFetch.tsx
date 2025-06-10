export async function safeFetch(url: string, options?: RequestInit) {
    const response = await fetch(url, options);

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || "Неизвестная ошибка";
        throw new Error(message);
    }

    return response.json();
}