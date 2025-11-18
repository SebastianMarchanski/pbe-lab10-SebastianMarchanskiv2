"use client";

export default function AppError({error}: {error: Error}){
    return(
        <div>
            <h2>Wystąpił błąd</h2>
            <p>{error.message}</p>
        </div>
    )
}