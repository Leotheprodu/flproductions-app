export async function HttpComponent<T>({
    url,
    method = 'GET',
    body = null,
    isFormData = false,
}: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: HeadersInit;
    body?: T | FormData | null;
    isFormData?: boolean;
    credentials?: RequestCredentials;
}) {
    const config: RequestInit = {
        method,
        credentials: 'include',
        body: isFormData ? (body as FormData) : JSON.stringify(body),
        headers: isFormData
            ? undefined
            : { 'Content-Type': 'application/json' },
    };
    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (response.status === 200) {
            return { data, error: null, status: 200 };
        } else {
            const error = data.message || 'Error desconocido';
            return { data: null, error, status: response.status };
        }
    } catch (error) {
        return {
            data: null,
            error: error.message,
            status: error.status || 500,
        };
    }
}
