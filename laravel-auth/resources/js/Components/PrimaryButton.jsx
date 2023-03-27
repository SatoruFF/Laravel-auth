import { Button } from 'antd';

export default function PrimaryButton({ children, props, disabled}) {
    return (
        <Button {...props} disabled={disabled} htmlType="submit">
            {children}
        </Button>
    );
}
