export default function defaultCheckInDateTime(){
    const today = new Date()
    const toDate = today.toISOString()
        ?.slice(0, 10);
    return (
        {
            check_in_date: toDate,
            check_out_date: toDate,
            check_in_time: "15:00",
            check_out_time: "11:00"
        }
    )
}