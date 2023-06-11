/**
 * Necesita 3 Hooks para funcionar, hice un useHttpComp personalizado para usarlo.
 * @param param0
 * @returns
 */
export async function fetchAPI<T>({
    url,
    method = 'GET',
    body = null,
    isFormData = false,
}: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: T | FormData | null;
    isFormData?: boolean;
}) {
    const config: RequestInit = {
        method,
        credentials: 'include',
        body:
            method === 'GET'
                ? undefined
                : isFormData
                ? (body as FormData)
                : JSON.stringify(body),
        headers: isFormData
            ? undefined
            : { 'Content-Type': 'application/json' },
    };
    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (response.status === 200) {
            return { data, error: null, status: 200 };
        } else if (response.status === 429) {
            return {
                data,
                error: 'Ha excedido el limite de consultas permitido',
                status: 429,
            };
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
