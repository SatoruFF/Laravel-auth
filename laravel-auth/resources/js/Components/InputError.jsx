export default function InputError({ message, ...props }) {
    return message ? (
        <p {...props}>
            {message}
        </p>
    ) : null;
}
