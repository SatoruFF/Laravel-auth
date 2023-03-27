export default function InputLabel({ value, children, ...props }) {
    return (
        <label {...props}>
            {value ? value : children}
        </label>
    );
}
