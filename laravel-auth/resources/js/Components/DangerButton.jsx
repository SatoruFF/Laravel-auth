import { Button } from "antd";
export default function DangerButton({
    disabled,
    children,
    ...props
}) {
    return (
        <Button type="primary" danger {...props} disabled={disabled}>
            {children}
        </Button>
    );
}
