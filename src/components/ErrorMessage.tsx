interface ErrorMessageProps {
    message: string
}


export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
        <>
            <div style={{
                padding: '10px',
                backgroundColor: '#ffe5e5',
                color: 'red',
                borderRadius: '5px',
                margin: '10px 0'
            }}>
                {message}
            </div>
        </>
    )
}