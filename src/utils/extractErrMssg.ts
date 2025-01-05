export default function extractErrMssg (data: {message: any, status: string, data: {message: any}}){
    const values = typeof data?.data?.message === 'object' ? Object.values(data?.data?.message).join(", ") : data?.message || data?.status 
    return values || "Please try again later"
}