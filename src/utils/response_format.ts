export function responseFormat(message: string, data?: any) {
    return data === null ? {
        message: message,
    } : {
        message: message,
        data: data
    }
}